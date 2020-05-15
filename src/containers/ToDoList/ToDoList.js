import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListTable from '../../components/ListTable/ListTable';
import toDoActions from '../../redux/toDoList/actions';
import './toDoStyle.css';

const ToDoList = (props) =>  {

    
   
    const { modalVisible, currentDay, list, searchValue, searchList } = props;
    // Showing Searched List if search input is not empty
    const listWithSerch = searchValue ? searchList : list;
    return (
        <div>
            <div className="pageHeader">
                header
            </div>
            {/* <ListTable
                list={listWithSerch}
                removeItem={removeItem}
                changeStatus={statusChange}
                searchValue = {searchValue}
            /> */}
        </div>
    );
};

ToDoList.propTypes = {
    modalVisibleRefrash : PropTypes.func.isRequired,
    listRefresh         : PropTypes.func.isRequired,
    modalVisible        : PropTypes.bool.isRequired,
    currentDay          : PropTypes.number.isRequired,
    list                : PropTypes.array.isRequired,
    searchList          : PropTypes.array.isRequired,
    history             : PropTypes.object.isRequired,
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
    modalVisibleRefrash : toDoActions.modalVisibleRefrash,
    listRefresh : toDoActions.listRefresh,
};

export default connect(mapStateToProps, mapDspatchToProps)(withRouter(ToDoList));
