import React from 'react';
import hooryBg from '../../assets/hoory icon grey.svg';
import './FirstStyle.scss';
import SubmitWizard from '../../components/SubmitWizard';
import InputElement from '../../components/InputElement';

const  First = () => {
  return (
    <>
      <div className="hooryIcon">
        <img src={hooryBg} alt="hoory" />
      </div>
      <h3 className="assistentName">Name your assistant</h3>
      <InputElement
        placeholder="Your assistant's name"
        type="text"
        className="nameInput"
      />
      <SubmitWizard text="Start" />
    </>
  );
};

export default First;
