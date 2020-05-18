import React from 'react';
import PropTypes from 'prop-types';
import './InputElementStyle.scss';
import { ic_info_outline as IconShowInformation } from 'react-icons-kit/md/ic_info_outline';
import { Icon } from 'react-icons-kit';
import { infoErrorMessages } from '../../constants/infoMessages';
import passwordIcon from '../../assets/password visibility.svg';

const InputElement = ({ name, value, placeholder, validFuilds, onChange, type, submited }) => {
    let fuildIsValid = true;
    if (submited && validFuilds.includes(name)) {
        fuildIsValid = false;
    }

    const showPass = () => {
        const x = document.getElementsByClassName('password')[0];
        if (x.type === 'password') {
            x.type = 'text';
        } else {
            x.type = 'password';
        }
    };

	return (
        <div className={`${fuildIsValid ? 'hideError' : 'showError'} inputBlock`}>
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className = {`${type === 'password' && 'password'} stringInput`} />
            {!fuildIsValid && <span className={`showInfo ${type === 'password' ? 'showPassword' : ''}`} title={infoErrorMessages[name]}><Icon icon = {IconShowInformation} /></span>}
            {type === 'password' && <div onClick={showPass}><img src={passwordIcon} alt="password" className="passwordIcon" /></div>}
        </div>
    );
};

InputElement.propTypes = {
    name        : PropTypes.string.isRequired,
    value       : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    placeholder : PropTypes.string.isRequired,
    type        : PropTypes.string.isRequired,
    onChange    : PropTypes.func.isRequired,
    validFuilds : PropTypes.array,
    submited : PropTypes.bool.isRequired,
};

InputElement.defaultProps = {
    validFuilds : [],
};

export default React.memo(InputElement);
