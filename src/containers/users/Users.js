import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ListTable from '../../components/ListTable/ListTable';
import usersActions from '../../redux/users/actions';
import { deriveUsersList } from '../../selectors/users';
import './UsersStyle.scss';

const Users = (props) =>  {


    const logOut = () => {
        // eslint-disable-next-line no-restricted-globals
        history.push('./login');
    };

    const removeItem = (e) => {
        const { id } = e.target.dataset;
        const { removeList } = props;
        // eslint-disable-next-line no-alert
        const confirm = window.confirm('Are you sure you wont to DELETE');
        if (!confirm) {
            return;
        }
        return removeList(id);
    };

    useEffect(() => {
        const { listReload } = props;
        return listReload();
    });

    const { list, searchList } = props;
    // Showing Searched List if search input is not empty
    // const listWithSerch = searchValue ? searchList : list;
    return (
        <div>
            <div className="pageHeader">
                <h2>Name Surname</h2>
                <div>
                    <button type="button" className="pageBack" onClick = {logOut}>Logout</button>
                </div>
            </div>
            <ListTable
                list={list}
                removeItem={removeItem}
                // searchValue = {}
            />
        </div>
    );
};

Users.propTypes = {
    listReload          : PropTypes.func.isRequired,
    removeList          : PropTypes.func.isRequired,
    list                : PropTypes.array.isRequired,
    searchList          : PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const { searchValue } = Users;
    return {
        list : deriveUsersList(state),
        searchValue,
    };
}

const mapDspatchToProps = {
    listReload : usersActions.listReload,
    removeList : usersActions.removeList,
};

export default connect(mapStateToProps, mapDspatchToProps)(withRouter(Users));
