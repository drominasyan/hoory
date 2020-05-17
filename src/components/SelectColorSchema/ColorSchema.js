import React from 'react';
import PropTypes from 'prop-types';
import { gbColorsSchema, borderColors } from '../../constants/colors';
import './ColorSchemaStyle.scss';

const ColorSchema = (props) => {
    const { onClick, colorNumber, selected } = props;
    const colorStyle = `linear-gradient(${gbColorsSchema[colorNumber]})`;
    const borderColor = selected ? borderColors[colorNumber] : 'transparent';
    const schemaBackground = {
      background: colorStyle,
    };
    const boderColor = {
        border : `3px solid ${borderColor}`,
    };
	return (
        // We are using inline styles becouse we are not allowed to use npm packeges (like styled components) by task requirement
        // We need to avoid Inlie styles in the feature because it is not the best practise
        <div className="colorsWrapper" style={boderColor}>
            <div onClick={onClick} data-id = {1} style={schemaBackground} />
        </div>
    );
};

ColorSchema.propTypes = {
    colorNumber : PropTypes.number.isRequired,
    selected    : PropTypes.bool.isRequired,
    onClick : PropTypes.func.isRequired,
    // active  	 : PropTypes.bool.isRequired,
};

export default ColorSchema;
