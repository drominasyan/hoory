import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import searchActions from '../../redux/search/actions';
import './headerStyle.scss';


const  Header  = (props) => {
	return (
		<div className="wizardMenu">
			Wizard Menu
		</div>
	);
};


// Checking Proptypes.
Header.propTypes = {
    // entities  	 : PropTypes.object.isRequired,
    // history  	 : PropTypes.object.isRequired,
    // searchValue  : PropTypes.string.isRequired,
    // searchValueRefrash  : PropTypes.func.isRequired,
    // searchListRefresh  : PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { searchReducer : { searchValue }, listReducer : { entities } } = state;
    return {
		entities,
		searchValue,
    };
}

const mapDispatchToProps = {
	searchValueRefrash : searchActions.searchValueRefrash,
	searchListRefresh : searchActions.searchListRefresh,
};

export default connect(null, null)(withRouter(Header));
