import React, { PureComponent } from 'react';
import WizardSteps from '../WizardSteps';
import WizardRouters from '../../router/routes';
import './RootStyle.scss';

class Root extends PureComponent {
	render() {
		return (
			<div className = "containter-fluid">
					<WizardSteps /> 
					<WizardRouters />
			</div>
		);
   }
}

export default Root;
