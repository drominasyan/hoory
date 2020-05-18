import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../../redux/store';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import googleIcon from '../../assets/google icon.svg';
import usersActions from '../../redux/users/actions';
import { validator } from './utils';
import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import wizardActions from '../../redux/wizardMenu/actions';
import { wizardStatuses } from '../../constants/statuses';
import './ThirdStyle.scss';

const  Third = ({ baseData, dataRefresh, uiRefresh, wizardRefrash }) => {

  const [validFuilds, setValidFuilds] = useState([]);
  const [submited, setSubmited] = useState(false);
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
    setValidFuilds([]);
    setSubmited(true);
    const requiredFuilds = ['firstname', 'lastName', 'email', 'confirmEmail', 'password'];
    // For fuilds Validation we are using cutom validation based on requirement (https://wizard.hoory.com/#/3).
    const array = validator(requiredFuilds, baseData);
    if (array.length) {
      return setValidFuilds([array[0]]);
    }
    wizardRefrash({ 3 : wizardStatuses.success });

    return history.push('/4');
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
            name="firstname"
            onChange={onChangeField}
            submited={submited}
            validFuilds={validFuilds}
            value={baseData.firstname || ''}
          />
          <InputElement
            placeholder="Last Name"
            type="text"
            className="nameInput"
            name="lastName"
            onChange={onChangeField}
            submited={submited}
            validFuilds={validFuilds}
            value={baseData.lastName || ''}
          />
        </div>
        <InputElement
          placeholder="Email"
          type="email"
          className="nameInput"
          name="email"
          onChange={onChangeField}
          submited={submited}
          validFuilds={validFuilds}
          value={baseData.email || ''}
        />
        <InputElement
          placeholder="Confirm your email address"
          type="email"
          className="nameInput"
          name="confirmEmail"
          onChange={onChangeField}
          submited={submited}
          validFuilds={validFuilds}
          value={baseData.confirmEmail || ''}
        />
        <InputElement
          placeholder="Password"
          type="password"
          className="nameInput"
          name="password"
          onChange={onChangeField}
          submited={submited}
          validFuilds={validFuilds}
          value={baseData.password || ''}
        />
        <p className="desc">Signing up for a Hoory account means you agree to the PP and T&S</p>
        <SubmitWizard text="Create account" onClick={next} />
        <p className="signin">Have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
};

Third.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    wizardRefrash : PropTypes.func.isRequired,
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
	wizardRefrash : wizardActions.wizardRefrash,
  uiRefresh    : usersActions.uiRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(Third);
