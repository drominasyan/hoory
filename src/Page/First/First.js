import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../../redux/store';
import hooryBg from '../../assets/hoory icon grey.svg';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import usersActions from '../../redux/users/actions';
import wizardActions from '../../redux/wizardMenu/actions';
import { wizardStatuses } from '../../constants/statuses';
import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import './FirstStyle.scss';

const  First = ({ baseData, dataRefresh, uiRefresh, wizardRefrash }) => {
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
    setSubmited(true);
    if (!baseData.asisName) {
      return setValidFuilds(['asisName']);
    }
    wizardRefrash({ 1 : wizardStatuses.success, 2 :  wizardStatuses.current });
    // // eslint-disable-next-line no-restricted-globals
    return history.push('./2');
  };

  return (
    <>
      <div className="hooryIcon">
        <img src={hooryBg} alt="hoory" />
      </div>
      <h3 className="assistentName">Name your assistant</h3>
      <InputElement
        placeholder="Your assistant's name"
        name="asisName"
        type="text"
        className="nameInput"
        onChange={onChangeField}
        submited={submited}
        validFuilds={validFuilds}
        value={baseData.asisName || ''}
      />
      <SubmitWizard text="Start" onClick={next} />
    </>
  );
};

First.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    dataRefresh   : PropTypes.func.isRequired,
    wizardRefrash   : PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const UI = deriveUsersUI(state);

  return {
    baseData : deriveUserBaseData(state),
    UI,
  };
}

const mapDispatchToProps = {
  dataRefresh  : usersActions.baseDataRefresh,
	wizardRefrash : wizardActions.wizardRefrash,
  uiRefresh    : usersActions.uiRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(First);
