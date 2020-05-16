import React from 'react';
import './SuccessStyle.scss';
import SubmitWizard from '../../components/SubmitWizard';

const  Success = () => {
  return (
    <div className="success">
      <h3>Fantastico <span role="img" aria-label="congrets">🎉</span></h3>
      <p>
        You have successfully setup the Hoory widget on your website!
        Proceed to Admin Dashboard to start training sd
      </p>
      <SubmitWizard text="Go to Admin Dashboard" />
    </div>
  );
};

export default Success;
