import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import ColorSchema from '../../components/SelectColorSchema';
import SelectIcon from '../../components/SelectIcon';
import SubmitWizard from '../../components/SubmitWizard';
import usersActions from '../../redux/users/actions';
import {
  deriveUserBaseData,
  deriveUsersUI,
} from '../../selectors/users';
import { gbColorsSchema } from '../../constants/colors';
import './SecondStyle.scss';

const listColors = Object.keys(gbColorsSchema);

const  Second = ({ baseData, dataRefresh, uiRefresh }) => {

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
      <SubmitWizard />
    </>
  );
};

Second.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Second);
