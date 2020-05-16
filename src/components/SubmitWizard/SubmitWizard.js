import React from 'react';
import PropTypes from 'prop-types';
import './SubmitWizardStyle.scss';

const SubmitWizard = (props) => {
	const { text } = props;
	return <button type="button" className="submitWizard">{text}</button>;
};

SubmitWizard.propTypes = {
    text : PropTypes.string,
};

SubmitWizard.defaultProps = {
  text: 'Next',
};

export default SubmitWizard;
