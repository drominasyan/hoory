import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_done } from 'react-icons-kit/md/ic_done';
import './StepIconStyle.scss';

const StepIcon = (props) => {
	const { complated, active } = props;
    const classNames = `${complated && 'complated'}`;
	return (
		<span className={`step`}>
			{<Icon  icon = {ic_done} />}
		</span>
	)
}

StepIcon.propTypes = {
    // complated  	 : PropTypes.bool.isRequired,
    // active  	 : PropTypes.bool.isRequired,
};

export default StepIcon;