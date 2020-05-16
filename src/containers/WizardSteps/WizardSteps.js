import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import searchActions from '../../redux/search/actions';
import StepIcon from '../../components/StepIcon'
import HooryIcon from '../../assets/hoory logo white.png'
import './WizardStepsStyle.scss';


const  WizardSteps  = (props) => {

	return (
		// We are using Navlink as uncontrolled (Navlink supports all needed functionalities we need)
		<div className="wizardMenu">
			<div className="title">
				<img src={HooryIcon} alt="hoory" />
				<span className="border" />
			</div>
			<NavLink
				to="/1"
				activeClassName="activeLink"
				className="menuItem"
			>
				<StepIcon /> Name your assistant
			</NavLink>
			<NavLink
				to="/2"
				activeClassName="activeLink"
				className="menuItem"
			>
				<StepIcon /> Select styles
			</NavLink>
			<NavLink
				to="/3"
				activeClassName="activeLink"
				className="menuItem"
				>
				<StepIcon /> Create your account
			</NavLink>
		</div>
	);
};


// Checking Proptypes.
WizardSteps.propTypes = {
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

export default connect(null, null)(WizardSteps);
