import React from 'react';
import PropTypes from 'prop-types';
import './styleStandardModal.css';

const  StandardModal = (props) => {
    const { children } = props;
    return (
        <div className="modalWrapper">
            <div className="windowModal">
                {children}
            </div>
        </div>
    );
};

StandardModal.prototype = {
    children  : PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};


export default StandardModal;
