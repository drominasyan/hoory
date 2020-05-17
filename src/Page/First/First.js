import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hooryBg from '../../assets/hoory icon grey.svg';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';
import usersActions from '../../redux/users/actions';
import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import './FirstStyle.scss';

const  First = ({ baseData, dataRefresh, uiRefresh }) => {
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
    <>
      <div className="hooryIcon">
        <img src={hooryBg} alt="hoory" />
      </div>
      <h3 className="assistentName">Name your assistant</h3>
      <InputElement
        placeholder="Your assistant's name"
        name="name"
        type="text"
        className="nameInput"
        onChange={onChangeField}
        value={baseData.name || ''}
      />
      <SubmitWizard text="Start" />
    </>
  );
};

First.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    dataRefresh   : PropTypes.func.isRequired,
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
  uiRefresh    : usersActions.uiRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(First);
