import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListTable from '../../components/ListTable/ListTable';
import usersActions from '../../redux/users/actions';
import './UsersStyle.scss';

const Users = (props) =>  {

    const visibleChange = () => {
        const { modalVisibleRefrash } = props;
        modalVisibleRefrash(true);
    };

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

    const { list, searchValue, searchList } = props;
    // Showing Searched List if search input is not empty
    const listWithSerch = searchValue ? searchList : list;
    return (
        <div>
            <div className="pageHeader">
                <h2>Name Surname</h2>
                <div>
                    <button type="button" className="pageBack" onClick = {logOut}>Logout</button>
                    <button type="button" className="AddButton" onClick = {visibleChange}>Add a new to-do</button>
                </div>
            </div>
            <ListTable
                list={listWithSerch}
                removeItem={removeItem}
                searchValue = {searchValue}
            />
        </div>
    );
};

Users.propTypes = {
    modalVisibleRefrash : PropTypes.func.isRequired,
    listReload          : PropTypes.func.isRequired,
    removeList          : PropTypes.func.isRequired,
    list                : PropTypes.array.isRequired,
    searchList          : PropTypes.array.isRequired,
    searchValue         : PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { listReducer : { modalVisible, currentDay, entities }, searchReducer : { searchValue, searchList } } = state;
    return {
        modalVisible,
        currentDay,
        list : entities[currentDay] || [],
        searchValue,
        searchList,
    };
}

const mapDspatchToProps = {
    listReload : usersActions.listReload,
    removeList : usersActions.removeList,
};

export default connect(mapStateToProps, mapDspatchToProps)(withRouter(Users));
