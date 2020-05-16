import React from 'react';
import PropTypes from 'prop-types';
import './SubmitWizardStyle.scss';

const SelectIcon = ({ type, number }) => {
    // eslint-disable-next-line import/no-dynamic-require
    const imgImporter = require(`../../assets/logos/${type}-${number}.svg`);
	return (
        <div>
            <div className="icons">
                <img src={imgImporter} alt="female2" />
            </div>
        </div>
    );
};

SelectIcon.propTypes = {
    type : PropTypes.string.isRequired,
    number : PropTypes.string.isRequired,
};

export default SelectIcon;
