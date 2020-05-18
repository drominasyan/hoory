import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { history } from '../../redux/store';
import StepIcon from '../../components/StepIcon';
import HooryIcon from '../../assets/hoory logo white.png';
import wizardActions from '../../redux/wizardMenu/actions';
import { wizardStatuses } from '../../constants/statuses';
import './WizardStepsStyle.scss';


const  WizardSteps  = ({ entities, editMode, newWorkspace }) => {

	const handleClick = (e) => {
		const { id } = e.target.dataset;
		if (entities[+id] === wizardStatuses.success || entities[+id] === wizardStatuses.current) {
			history.push('./id');
		} else e.preventDefault();
	};


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
				onClick={handleClick}
				data-id={1}
			>
				<StepIcon status = {entities[1]} /> Name your assistant
			</NavLink>
			<NavLink
				to="/2"
				activeClassName="activeLink"
				className="menuItem"
				data-id={2}
				onClick={handleClick}
			>
				<StepIcon status = {entities[2]} /> Select styles
			</NavLink>
			{(!editMode && !newWorkspace) && (
				<NavLink
					to="/3"
					onClick={handleClick}
					activeClassName="activeLink"
					className="menuItem"
					data-id={3}
				>
					<StepIcon status = {entities[3]} /> Create your account
				</NavLink>
			)}
		</div>
	);
};


// Checking Proptypes.
WizardSteps.propTypes = {
    entities  	  : PropTypes.object.isRequired,
    editMode  	  : PropTypes.bool.isRequired,
    newWorkspace  	  : PropTypes.bool.isRequired,
};

function mapStateToProps({ Wizard }) {
    const entities = Wizard.get('entities');
    const UI = Wizard.get('UI');
    return {
		entities,
		editMode : UI.editMode,
		newWorkspace : UI.newWorkspace,
    };
}

const mapDispatchToProps = {
	wizardRefrash : wizardActions.wizardRefrash,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardSteps);
