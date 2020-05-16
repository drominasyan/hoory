import React from 'react';
import { Link } from 'react-router-dom';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import './ThirdStyle.scss';
import googleIcon from '../../assets/google icon.svg';

const  Third = () => {
  return (
    <div className="signup">
      <h3>Create your account</h3>
      <div className="form">
        <p className="googleSide"><img className="google-icon" src={googleIcon} alt="google" />Sign Up with Google</p>
        <div className="seperator">
          <hr /><span>or</span><hr />
        </div>
        <div className="names">
          <InputElement
            placeholder="First Name"
            type="text"
            className="nameInput firstName"
            name="firstName"
          />
          <InputElement
            placeholder="Last Name"
            type="text"
            className="nameInput"
            name="lastName"
          />
        </div>
        <InputElement
          placeholder="Email"
          type="email"
          className="nameInput"
          name="email"

        />
        <InputElement
          placeholder="Confirm your email address"
          type="email"
          className="nameInput"
          name="confirmEmail"
        />
        <InputElement
          placeholder="Password"
          type="password"
          className="nameInput"
          name="password"
        />
        <p className="desc">Signing up for a Hoory account means you agree to the PP and T&S</p>
        <SubmitWizard text="Create account" />
        <p className="signin">Have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Third;
