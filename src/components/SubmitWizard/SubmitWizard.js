import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SubmitWizardStyle.scss';

const SubmitWizard = ({ text, onClick }) => {
	return <button type="button" className="submitWizard" onClick={onClick}>{text}</button>;
};

SubmitWizard.propTypes = {
    text : PropTypes.string,
    onClick : PropTypes.func.isRequired,
};

SubmitWizard.defaultProps = {
  text: 'Next',
};

export default withRouter(SubmitWizard);
