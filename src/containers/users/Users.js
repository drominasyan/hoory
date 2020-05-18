import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ListTable from '../../components/ListTable/ListTable';
import usersActions from '../../redux/users/actions';
import wizardActions from '../../redux/wizardMenu/actions';
import { deriveUsersList } from '../../selectors/users';
import './UsersStyle.scss';

class Users extends Component {

    componentDidMount() {
        const { listReload } = this.props;
        listReload();
    }

    removeItem = (id) => {
        const { removeList } = this.props;
        // eslint-disable-next-line no-alert
        const confirm = window.confirm('Are you sure you wont to DELETE');
        if (!confirm) {
            return;
        }
        return removeList(id);
    };

    edit= (id) => {
        const { baseDataReload, uiRefrash } = this.props;
        uiRefrash({ newWorkspace : false, editMode : true });
        return baseDataReload(id);
    }

    // Showing Searched List if search input is not empty
    // const listWithSerch = searchValue ? searchList : list;
    render() {
        const { removeList, list }  = this.props;
        return (
            <div>
                <ListTable
                    list={list}
                    onRemove={removeList}
                    onEdit={this.edit}
                />
            </div>
        );
    }
}

Users.propTypes = {
    listReload        : PropTypes.func.isRequired,
    removeList        : PropTypes.func.isRequired,
    baseDataReload    : PropTypes.func.isRequired,
    uiRefrash    : PropTypes.func.isRequired,
    list              : PropTypes.array.isRequired,
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
    removeList : usersActions.reoveUserByID,
    baseDataReload : usersActions.baseDataReload,
    uiRefrash : wizardActions.uiRefresh,
};

export default connect(mapStateToProps, mapDspatchToProps)(withRouter(Users));
