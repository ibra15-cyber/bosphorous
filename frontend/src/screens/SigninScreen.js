import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (event) => {
    event.preventDefault(); //dont refresh the page when user click on the sign in button
    try {
      const { data } = await Axios.post('/api/users/signin', {
        // {data} is what we will be sending back after receiving a body req
        email,
        password,
      });

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
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>

      <Form onSubmit={submitHandler}>
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

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New Customer?
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>

        <div className="mb-3">
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;
