import React, { useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../store/authRedux';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
  
  
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const handleLogin = async (e) => {
      e.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
  
      try {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC29fiiEtsAO5OFbtnVO5GpoVnroUMaou4',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        dispatch(authActions.login({idToken: data.idToken, UID: data.localId}))
        navigate('/welcome');
      } else {
        const data = await response.json();
        if (data.error.code === 400) {
          toast.error('Account not found. Please sign up.');
        } else {
          toast.error('Authentication failed: ' + data.error.message);
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      toast.error('Authentication failed. Please try again later.');
    }
  };

  return (
    <div>
     <Container>
        <Container className='w-50 mt-5'>
          <div className='signup-content bg-light p-4 rounded'>
            <h2 className='text-center'>Login</h2>
            <form onSubmit={handleLogin}>
              <label>Email:</label>
              <br />
              <input
                type='email'
                className='form-control'
                ref={emailInputRef}
                placeholder='Enter your email'
              />

              <br />
              <label>Password:</label>
              <br />
              <input
                type='password'
                className='form-control'
                ref={passwordInputRef}
                placeholder='Enter your password'
              />
              <div className='text-center'>
                <Link to='/forgetpassword'>Forgot Password?</Link>
              </div>
              <br />
              <Button type='submit' variant='primary' className='w-100'>
                Login
              </Button>
              <br />
              <br />
            </form>
          </div>
        </Container>
        <br />
        <Container className='w-50'>
          <div
            className='signup-content bg-light p-2 rounded'
            style={{ border: '1px solid lightcoral', textAlign: 'center' }}
          >
            <p className='m-0' style={{ fontSize: '20px', fontFamily: 'bold' }}>
              Have Not Account? {'    '}
              <span className='btn p-0'>
                <Link to='/signup'>SIGNUP</Link>
              </span>
            </p>
          </div>
        </Container>
        <br />
        <br />
        <ToastContainer />
      </Container>
    </div>
  );
};

export default SignIn;
