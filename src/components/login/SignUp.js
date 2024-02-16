import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [passwordError, setPasswordError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (!isEmailValid(enteredEmail)) {
      toast.error('Invalid email.');
      return;
    }

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC29fiiEtsAO5OFbtnVO5GpoVnroUMaou4',
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
        toast.success(`${data.email}, Your account has been created!`);
        navigate('/');
      } else {
        const data = await response.json();
        toast.error('Sign up failed: ' + data.error.message);
      }
    } catch (error) {
      toast.error('Sign up failed. Please try again later.');
    }

    // Reset the form
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    confirmPasswordInputRef.current.value = '';
    setPasswordError('');
  };
  const handleConfirmPasswordChange = () => {
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };
  return (
    <div>
      <Container className='p-5'>
        <Container className='w-50 p-3'>
          <div className='signup-content bg-light p-4 rounded'>
            <h2 className='text-center'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email:
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  ref={emailInputRef}
                  placeholder='Enter your email'
                />
              </div>
              <div className='row mb-3'>
                <div className='col'>
                  <label htmlFor='password' className='form-label'>
                    Password:
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    ref={passwordInputRef}
                    placeholder='Enter your password'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Confirm Password:
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    ref={confirmPasswordInputRef}
                    placeholder='Confirm your password'
                    onChange={handleConfirmPasswordChange}
                  />
                  {passwordError && (
                    <p style={{ color: 'red' }}>{passwordError}</p>
                  )}
                </div>
                <br />
              </div>
              <br />
              <button type='submit' className='btn btn-primary w-100'>
                Sign Up
              </button>
            </form>
          </div>
        </Container>
        <Container className='w-50'>
          <div
            className='signup-content bg-light p-2 rounded'
            style={{ border: '1px solid lightcoral', textAlign: 'center' }}
          >
            <p className='m-0' style={{ fontSize: '20px', fontFamily: 'bold' }}>
              Already Have Account? {'    '}
              <span className='btn p-0'>
                <NavLink to='/'>LOGIN</NavLink>
              </span>
            </p>
          </div>
        </Container>
      </Container>
      <br />
      <ToastContainer />
    </div>
  );
};
export default SignUp;
