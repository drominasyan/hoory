import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../images/rob.png';
import './404.style.css';

class FourZeroFour extends React.Component {
  render() {
    return (
      <div className="404Page">
        <div className="404Content">
          <h1>
           404
          </h1>
          <h3>
            We couldn`t find that page
          </h3>
            <Link to="/Homepage">
              Homepage
            </Link>
        </div>

        <div className="iso404Artwork">
          <img alt="#" src={Image} />
        </div>
      </div>
    );
  }
}

export default FourZeroFour;
