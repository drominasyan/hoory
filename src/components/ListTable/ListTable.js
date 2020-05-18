import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_mode_edit as Edit } from 'react-icons-kit/md/ic_mode_edit';
import { ic_more_vert as More }  from 'react-icons-kit/md/ic_more_vert';
import { ic_delete as Delete } from 'react-icons-kit/md/ic_delete';
import SelectIcon from '../SelectIcon';
import './listTableStyle.scss';

const  ListTable = (props) => {

    const { list, onRemove, onEdit } = props;
    const renderTableData = () => {
        return list.map(item => {
           const { asisName, colorSchema, gender, id } = item;
           return (
                <div key={id} data-id={id}>
                    <div><SelectIcon number={colorSchema} type={gender} />{asisName}</div>
                    <div className="moreBlock">
                        <div className="actions">
                            <span onClick={() => onEdit(id)}><Icon icon = {Edit} /></span>
                            <span className="delete hidden" onClick={() => onRemove(id)}><Icon icon = {Delete} /></span>
                            <span className="more"><Icon icon = {More} /></span>
                        </div>
                    </div>
                </div>
           );
        });
    };

    if (!list.length) {
        return <div>No data</div>;
    }

    return (
        <div className="list">
            {renderTableData()}
        </div>
    );
};

ListTable.propTypes = {
    list       : PropTypes.array.isRequired,
    onRemove   : PropTypes.func.isRequired,
    onEdit     : PropTypes.func.isRequired,
};
export default React.memo(ListTable);
