import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Users from '../../containers/users';
import usersActions from '../../redux/users/actions';
import wizardActions from '../../redux/wizardMenu/actions';
import { history }  from '../../redux/store';
import logout from '../../assets/logout.svg';
import profileImg from '../../assets/fepro.webp';
import './DashboardStyle.scss';

const Dashboard = ({ uiRefresh }) => {

    const addWorkspace = () => {
        uiRefresh({ newWorkspace : true, editMode : false });
        history.push('./1');
    };

    return (
        <div className="dashboard">
            <div className="dashHeader">
                <div className="infoBlock">
                    <div className="imageProfile">
                        <img src={profileImg} alt="profile" />
                    </div>
                    <div className="info">
                        <h3>Name Surname</h3>
                        <p>yaya@mail.ru</p>
                    </div>
                </div>
                <div className="logout">
                    <p>Logout
                        <img src={logout} alt="logout" />
                    </p>
                </div>
            </div>
            <Users />
            <div className="addWorkspace" onClick={addWorkspace}>+ Add Workspace</div>
        </div>
    );
};

Dashboard.propTypes = {
    uiRefresh     : PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout  : usersActions.logout,
  uiRefresh    : wizardActions.uiRefresh,
};

export default connect(null, mapDispatchToProps)(Dashboard);
