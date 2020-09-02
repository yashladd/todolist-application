import React, { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { FiEdit3 } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { firebase } from '../../firebase';

export const Task = props => {
  const [editing, setEditing] = useState(false);
  const [editableTask, setEditableTask] = useState(props.task.task);

  const editTask = id => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({
        task: editableTask,
      })
      .then(() => {
        setEditing(false);
      });
  };
  let textDecoration = props.task.archived ? 'line-through' : 'none';
  return (
    <div className={!editing ? 'tasks__list-item-body' : undefined}>
      {!editing ? (
        <>
          <Checkbox id={props.task.id} archived={props.task.archived} />
          <div>
            <span style={{ textDecoration }}>{editableTask}</span>
          </div>
          <div>
            <span
              style={{
                cursor: 'pointer',
                marginLeft: 'auto',
                color: '#cacaca',
              }}
              onClick={() => setEditing(true)}
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
                props.deleteTask(props.task.id);
              }}
            >
              <FaTrashAlt />
            </span>
          </div>
        </>
      ) : (
        <>
          <div>
            <input
              type='text'
              placeholder={props.task.task}
              value={editableTask}
              style={{
                width: '540px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                borderRadius: '3px',
                height: '35px',
                paddingLeft: '10px',
              }}
              onChange={e => setEditableTask(e.target.value)}
            />
          </div>

          <button
            className='add-task__submit'
            onClick={() => editTask(props.task.id)}
          >
            Save
          </button>

          <span
            className='add-task__cancel'
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </span>
        </>
      )}
    </div>
  );
};
