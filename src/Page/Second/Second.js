import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import { history } from '../../redux/store';
import ColorSchema from '../../components/SelectColorSchema';
import SelectIcon from '../../components/SelectIcon';
import SubmitWizard from '../../components/SubmitWizard';
import usersActions from '../../redux/users/actions';
import wizardActions from '../../redux/wizardMenu/actions';
import { wizardStatuses } from '../../constants/statuses';


import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import { gbColorsSchema } from '../../constants/colors';
import './SecondStyle.scss';

const listColors = Object.keys(gbColorsSchema);

const  Second = ({ baseData, dataRefresh, uiRefresh, wizardRefrash, editMode, esitUser, newWorkspace, addNewWorkSpace }) => {

  // Local Events ---------------------------------------------------------------------------------
  const onChangeSchema = (dataID) => {
    const dataName = 'colorSchema';
    if (!dataName) {
      return;
    }

    const resData = cloneDeep(baseData);
    resData[dataName] = dataID;
    dataRefresh(resData);
    uiRefresh({ isChanged: true });
  };

  const onChangeIcon = (type) => {
    const dataName = 'gender';
    if (!dataName) {
      return;
    }

    const resData = cloneDeep(baseData);
    resData[dataName] = type;
    dataRefresh(resData);
    uiRefresh({ isChanged: true });
  };

  const next = () => {
    // // eslint-disable-next-line no-restricted-globals
    wizardRefrash({ 2 : wizardStatuses.success, 3 :  wizardStatuses.current });
    if (editMode) {
      history.push('./dashboard');
      return esitUser();
    }

    if (newWorkspace) {
      history.push('./dashboard');
      return addNewWorkSpace();
    }

    return history.push('./3');

  };

  return (
    <>
      <h3>Select ass`s icon</h3>
      <div className="icons">
        <SelectIcon type={baseData.gender === 'female' ? 'female-selected' : 'female'} number={baseData.colorSchema} onClick={() => onChangeIcon('female')} />
        <SelectIcon type={baseData.gender === 'male' ? 'male-selected' : 'male'} number={baseData.colorSchema} onClick={() => onChangeIcon('male')} />
      </div>
      <h3>Select color scheme</h3>
      <div className= "colorSchema">
        {listColors.map(item => <ColorSchema selected={baseData.colorSchema === +item} key={uuidv4()} colorNumber = {item} onClick={() => onChangeSchema(+item)} /> )}
      </div>
      <SubmitWizard onClick={next} />
    </>
  );
};

Second.propTypes = {
    baseData      : PropTypes.object.isRequired,
    uiRefresh     : PropTypes.func.isRequired,
    wizardRefrash   : PropTypes.func.isRequired,
    dataRefresh   : PropTypes.func.isRequired,
    esitUser   : PropTypes.func.isRequired,
    editMode   : PropTypes.bool.isRequired,
    newWorkspace   : PropTypes.bool.isRequired,
    addNewWorkSpace   : PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const UI = deriveUsersUI(state);
  const baseData = deriveUserBaseData(state);
  const wizrdUI = state.Wizard.get('UI');


  return {
    UI,
    baseData,
    editMode:wizrdUI.editMode,
    newWorkspace:wizrdUI.newWorkspace,
  };
}

const mapDispatchToProps = {
  dataRefresh      : usersActions.baseDataRefresh,
  addNewWorkSpace  : usersActions.addNewWorkSpace,
	wizardRefrash : wizardActions.wizardRefrash,
  uiRefresh    : usersActions.uiRefresh,
  esitUser    : usersActions.editUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Second);
