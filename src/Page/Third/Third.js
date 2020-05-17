import React from 'react';
import { Link } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import googleIcon from '../../assets/google icon.svg';
import usersActions from '../../redux/users/actions';
import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import './ThirdStyle.scss';

const  Third = ({ baseData, dataRefresh, uiRefresh }) => {
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
            onChange={onChangeField}
            value={baseData.firstName || ''}
          />
          <InputElement
            placeholder="Last Name"
            type="text"
            className="nameInput"
            name="lastName"
            onChange={onChangeField}
            value={baseData.lastName || ''}
          />
        </div>
        <InputElement
          placeholder="Email"
          type="email"
          className="nameInput"
          name="email"
          onChange={onChangeField}
          value={baseData.email || ''}
        />
        <InputElement
          placeholder="Confirm your email address"
          type="email"
          className="nameInput"
          name="confirmEmail"
          onChange={onChangeField}
          value={baseData.confirmEmail || ''}
        />
        <InputElement
          placeholder="Password"
          type="password"
          className="nameInput"
          name="password"
          onChange={onChangeField}
          value={baseData.password || ''}
        />
        <p className="desc">Signing up for a Hoory account means you agree to the PP and T&S</p>
        <SubmitWizard text="Create account" />
        <p className="signin">Have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
};

Third.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    dataRefresh   : PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const UI = deriveUsersUI(state);
  const baseData = deriveUserBaseData(state);

  return {
    UI,
    baseData,
  };
}

const mapDispatchToProps = {
  dataRefresh  : usersActions.baseDataRefresh,
  uiRefresh    : usersActions.uiRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(Third);
