import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

function SignupScreen() {
  //setting routing back to the home screen anything we fail to find a route
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (event) => {
    event.preventDefault(); //dont refresh the page when user click on the sign in button

    //if passwords and confirm password don't match, send error and do not proceed
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    }

    //try to send our data to the db
    try {
      const { data } = await axios.post('/api/users/signup', {
        //we are sending this data; but we know we will receive something back, so we save it as data
        name,
        email,
        password,
        // confirmPassword,
      });

      //we call our dispatch from use reducer to track our action; here we are sigining in;
      //payload will pass our data to userInfo
      //userInfo will now be set in initial state in reducer
      ctxDispatch({
        type: 'USER_SIGNIN',
        payload: data,
      });

      //we told our context in the reducer to set a case for signin;
      // there we want to get value aka payload to save as userInfo so
      // here we saving the result in the localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      // console.log(data); //debugging to catch our res.send from the backend
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container mb-3">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name </Form.Label>
          <Form.Control
            // type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(eml) => setEmail(eml.target.value)}
          />{' '}
          {/** track whatever is entered and set it as the default in useState */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(passwd) => setPassword(passwd.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div>
          Already have an account ?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In </Link>
        </div>
      </Form>
    </Container>
  );
}

export default SignupScreen;
