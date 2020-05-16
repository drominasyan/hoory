import React from 'react';
import PropTypes from 'prop-types';
import './InputElementStyle.scss';
import passwordIcon from '../../assets/password visibility.svg';

const InputElement = (props) => {
    const { name, value, placeholder, isError, onChange, type } = props;
	return (
        <div className={`${isError && 'inputBlock'} inputBlock`}>
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className = "stringInput" />
            {type === 'password' && <img src={passwordIcon} alt="password" className="passwordIcon" />}
        </div>
    );
};

InputElement.propTypes = {
    name        : PropTypes.string.isRequired,
    value       : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    placeholder : PropTypes.string.isRequired,
    type        : PropTypes.string.isRequired,
    onChange    : PropTypes.func.isRequired,
    isError     : PropTypes.bool.isRequired,
};

export default InputElement;
