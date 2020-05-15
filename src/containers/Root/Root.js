import React, { PureComponent } from 'react';
import Header from '../Header';
import WizardRouters from '../../router/routes';
import './RootStyle.css';

class Root extends PureComponent {
	render() {
		return (
			<div className = "containter-fluid">
					<Header /> 
					<WizardRouters />
			</div>
		);
   }
}

export default Root;
