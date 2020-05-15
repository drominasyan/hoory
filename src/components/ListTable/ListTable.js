import React from 'react';
import PropTypes from 'prop-types';
// import { statuses } from '../../Helpers/constants';
import './listTableStyle.css';

const  ListTable = (props) => {

    const { list, removeItem, changeStatus } = props;
    const renderTableData = () => {
        return list.map(item => {
           const { title, status, description, id } = item;
           return (
                <tr key={id}>
                    <td>
                        <p><b>{title}</b></p>
                        <p>{description}</p>
                    </td>
                    <td>
                        <div data-id={id} onClick={removeItem}>Remove</div>
                    </td>
                </tr>
           );
        });
    };

    if (!list.length) {
        return <div>No data</div>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>To-do item</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

ListTable.propTypes = {
    list         : PropTypes.array.isRequired,
    changeStatus : PropTypes.func.isRequired,
    removeItem   : PropTypes.func.isRequired,
};
export default React.memo(ListTable);
