import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../../redux/store';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import googleIcon from '../../assets/google icon.svg';
import authActions from '../../redux/auth/actions';
import {
  deriveAuthData,
  deriveAuthUI,
} from '../../selectors/auth';
import HooryIcon from '../../assets/hoory logo.svg';
import { validateEmail } from '../../helpers/utils';

import './SignInStyle.scss';

const  SignIn = ({ baseData, dataRefresh, uiRefresh }) => {
  const [errorMessage, setErrorMessage] = useState('');
  // Local Events ---------------------------------------------------------------------------------
  const onChangeField = (e) => {
    const rawValue = e.target.value;
    const dataName = e.target.name;
    if (!dataName) {
      return;
    }

    const resData = cloneDeep(baseData);
    resData[dataName] = rawValue;

    dataRefresh(resData);
    uiRefresh({ isChanged: true });
  };

  const next = () => {
    const { password, email } = baseData;
    if (!password || !email) {
      return setErrorMessage('Fill all required fuilds');
    }
    if (!(password.length > 8) || !validateEmail) {
      return setErrorMessage('Invalid username or password');
    }
    setErrorMessage('');
    // If there is no Error
    // Bellow function we need to call in middlware after resiving response for success authentication,;
    // Now we are only checking the valid data and when the validation success navigating the dashboard.
    // Pls. take a look that we don't have any API
    history.push('/dashboard');
  };

  return (
    <div className="signin">
      <img src={HooryIcon} alt="icon" />
      <h3>Sign in to your account</h3>
      <div className="form">
        <p className="googleSide"><img className="google-icon" src={googleIcon} alt="google" />Sign Up with Google</p>
        <div className="seperator">
          <hr /><span>or</span><hr />
        </div>
        <div className="">
          <InputElement
            placeholder="Email"
            type="text"
            className="nameInput"
            name="email"
            onChange={onChangeField}
            value={baseData.email || ''}
          />
          <InputElement
            placeholder="Password"
            type="password"
            className="nameInput"
            name="password"
            onChange={onChangeField}
            value={baseData.password || ''}
          />
        </div>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <SubmitWizard text="Sign In" onClick={next} />
        <p className="desc">Don’t have an account? <Link to="/3">Sign up</Link></p>
        <p className="forgot"><Link to="/">Forgot password</Link></p>
      </div>
    </div>
  );
};

SignIn.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    dataRefresh   : PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  const UI = deriveAuthUI(state);
  const baseData = deriveAuthData(state);

  return {
    UI,
    baseData,
  };
}

const mapDispatchToProps = {
  dataRefresh  : authActions.dataRefresh,
  uiRefresh    : authActions.uiRefresh,
  login        : authActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
