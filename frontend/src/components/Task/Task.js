import React, { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { FiEdit3 } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

export const Task = props => {
  let textDecoration = props.task.archived ? 'line-through' : 'none';
  const [editing, setEditing] = useState();

  return (
    <div className='tasks__list-item-body'>
      <Checkbox id={props.task.id} archived={props.task.archived} />
      <div>
        <span style={{ textDecoration }}>{props.task.task}</span>
      </div>
      <div>
        <span
          style={{
            cursor: 'pointer',
            marginLeft: 'auto',
            color: '#cacaca',
          }}
        >
          <FiEdit3 />
        </span>
      </div>
      <div>
        <span
          style={{
            cursor: 'pointer',
            marginLeft: 'auto',
            color: '#cacaca',
          }}
          onClick={() => {
            console.log('fired');
            props.deleteTask(props.task.id);
          }}
        >
          <FaTrashAlt />
        </span>
      </div>
    </div>
  );
};
