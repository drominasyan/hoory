import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubmitWizard from '../../components/SubmitWizard';
import SelectIcon from '../../components/SelectIcon';
import { history } from '../../redux/store';

import {
  deriveUserBaseData,
} from '../../selectors/users';
import './ForthStyle.scss';

const  Forth = ({ baseData }) => {
  const next = () => {
    history.push('/signin');
  };
  return (
    <div className="success">
      <SelectIcon type={baseData.gender} number={baseData.colorSchema} />
      <h3>Fantastico <span role="img" aria-label="congrets">🎉</span></h3>
      <p>
        You have successfully setup the Hoory widget on your website!
        Proceed to Admin Dashboard to start training sd
      </p>
      <SubmitWizard text="Go to Admin Dashboard" onClick={next} />
    </div>
  );
};

Forth.propTypes = {
    baseData : PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const baseData = deriveUserBaseData(state);

  return {
    baseData,
  };
}

export default connect(mapStateToProps, null)(Forth);
