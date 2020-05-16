import React from 'react';
import ColorSchema from '../../components/SelectColorSchema';
import SelectIcon from '../../components/SelectIcon';
import SubmitWizard from '../../components/SubmitWizard';

import './SecondStyle.scss';

const  Second = () => {
  return (
    <>
      <h3>Select ass`s icon</h3>
      <div className="icons">
        <SelectIcon type="female" number="1" />
        <SelectIcon type="male" number="1" />
        <SelectIcon type="female" number="2" />
      </div>
      <h3>Select color scheme</h3>
      <div className= "schemas">
        <ColorSchema colorNumber = {1} />
        <ColorSchema colorNumber = {2} />
        <ColorSchema colorNumber = {3} />
        <ColorSchema colorNumber = {4} />
        <ColorSchema colorNumber = {5} />
        <ColorSchema colorNumber = {6} />
        <ColorSchema colorNumber = {7} />
      </div>
      <SubmitWizard />
    </>
  );
};

export default Second;
