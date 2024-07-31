import React, { useState } from "react";
import * as Components from '../Components';
import axios from 'axios';
import styles from './Login_Signup.module.css';

function Login_Signup({onLoginSuccess,setUser}) {
    const [signIn, toggle] = useState(true);
  
    const [signUpForm, setSignUpForm] = useState({
      fullname: '',
      email: '',
      password: '',
    });
  
    const [signUpErrors, setSignUpErrors] = useState({});
  
    const [signInForm, setSignInForm] = useState({
      email: '',
      password: '',
    });
  
    const [signInErrors, setSignInErrors] = useState({});
  
    const handleSignUpChange = (e) => {
      const { name, value } = e.target;
      setSignUpForm({ ...signUpForm, [name]: value });
    };
  
    const handleSignInChange = (e) => {
      const { name, value } = e.target;
      setSignInForm({ ...signInForm, [name]: value });
    };
  
    const validateSignUp = () => {
      const errors = {};
      if (!signUpForm.fullname) errors.fullname = 'Name is required';
      if (!signUpForm.email) errors.email = 'Email is required';
      if (!signUpForm.password) errors.password = 'Password is required';
      return errors;
    };
  
    const validateSignIn = () => {
      const errors = {};
      if (!signInForm.email) errors.email = 'Email is required';
      if (!signInForm.password) errors.password = 'Password is required';
      return errors;
    };
  
    const onSignUp = async (e) => {
      e.preventDefault();
      const errors = validateSignUp();
      if (Object.keys(errors).length > 0) {
        setSignUpErrors(errors);
        return;
      }
      setSignUpErrors({});
      const userInfo = {
        fullname: signUpForm.fullname,
        email: signUpForm.email,
        password: signUpForm.password
      };
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, userInfo)
        .then((res) => {
          if (res.data) {
            alert('Signup Successful');
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setUser(res.data.user)
            onLoginSuccess()
          }
        })
        .catch((err) => {
          alert('Signup Failed');
          if (err.response) {
            console.log(err);
          }
        });
    };
  
    const onSignIn = async (e) => {
      e.preventDefault();
      const errors = validateSignIn();
      if (Object.keys(errors).length > 0) {
        setSignInErrors(errors);
        return;
      }
      setSignInErrors({});
      const userInfo = {
        email: signInForm.email,
        password: signInForm.password
      };
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, userInfo)
        .then((res) => {
          if (res.data) {
            alert('Login Successful');
            setUser(res.data.user)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            onLoginSuccess()
          }
        })
        .catch((err) => {
          alert('Login Failed');
          if (err.response) {
            console.log(err);
          }
        });
    };
  
    return (
      <Components.Container className={styles.container}>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={onSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              name="fullname"
              placeholder="Name"
              value={signUpForm.fullname}
              onChange={handleSignUpChange}
            />
            {signUpErrors.fullname && <span>{signUpErrors.fullname}</span>}
            <Components.Input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpForm.email}
              onChange={handleSignUpChange}
            />
            {signUpErrors.email && <span>{signUpErrors.email}</span>}
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
            />
            {signUpErrors.password && <span>{signUpErrors.password}</span>}
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
  
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={onSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              name="email"
              placeholder="Email"
              value={signInForm.email}
              onChange={handleSignInChange}
            />
            {signInErrors.email && <span>{signInErrors.email}</span>}
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={signInForm.password}
              onChange={handleSignInChange}
            />
            {signInErrors.password && <span>{signInErrors.password}</span>}
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
  
        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
  
            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    );
  }

export default Login_Signup