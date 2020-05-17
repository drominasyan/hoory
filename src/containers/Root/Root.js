import React from 'react';
import WizardSteps from '../WizardSteps';
import WizardRouters from '../../router/routes';
import './RootStyle.scss';

const Root = () => {
	return (
		<div className = "containter-fluid">
				<aside id = "sidebar">
					<WizardSteps />
				</aside>
				<section id = "section-content">
					<WizardRouters />
				</section>
		</div>
	);
};

export default Root;
