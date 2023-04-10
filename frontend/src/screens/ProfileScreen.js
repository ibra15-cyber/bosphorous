import React, { useContext, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAL':
      return { ...state, loadingUpdate: true };
    default:
      return state;
  }
};
function ProfileScreen() {
  //reducer from context to control serving data across
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // const { userInfo } = cart; //user info not in cart but on the same level

  console.log('user', userInfo);
  const [name, setName] = useState(userInfo.name); //his calls our form with default fields
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //reducer to contorl loading and error
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHander = async (e) => {
    e.preventDefault();
    try {
      // dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        'api/users/profile',
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        //to control the running loading spinner
        type: 'UPDATE_SUCCESS',
      });

      ctxDispatch({ type: 'USER_SIGNIN', payload: data }); //update the database
      localStorage.setItem('userInfo', JSON.stringify(data)); //update the localstorage
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };
  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile </h1>
      <form onSubmit={submitHander}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            // value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit"> Update </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileScreen;
