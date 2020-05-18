import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_done as IconType } from 'react-icons-kit/md/ic_done';
import { wizardStatuses } from '../../constants/statuses';

import './StepIconStyle.scss';

const StepIcon = ({ status }) => {
    let classNames;
	if (status === wizardStatuses.current) {
		classNames = 'current';
	} else if (status === wizardStatuses.success) {
		classNames = 'success';
	} else {
		classNames = 'wait';
	}
	return (
		<div className="stepIconBlock">
			<span className={`step ${classNames}`}>
				<Icon icon = {IconType} />
			</span>
		</div>
	);
};

StepIcon.propTypes = {
    status : PropTypes.number.isRequired,
};

export default StepIcon;
