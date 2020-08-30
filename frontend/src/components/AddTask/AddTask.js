import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../../firebase';
import { useSelectedBucketValue } from '../../context';
import { BucketOverlay } from '../BucketOverlay/BucketOverlay';
import { TaskDate } from '../TaskDate/TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [bucket, setBucket] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showBucketOverlay, setShowBucketOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedBucket } = useSelectedBucketValue();

  const addTask = () => {
    const bucketId = bucket || selectedBucket;
    let collatedDate = '';
    if (bucketId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (bucketId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      task &&
      bucketId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          bucketId,
          task,
          date: collatedDate || taskDate,
          userId: 'd83b6768-e9d7',
        })
        .then(() => {
          setTask('');
          setBucket('');
          setShowMain('');
          setShowBucketOverlay(false);
        })
    );
  };

  return (
    <div className={showQuickAddTask ? 'add-task__overlay' : 'add-task'}>
      {showAddTaskMain && (
        <div
          className='add-task__shallow'
          onClick={() => setShowMain(!showMain)}
        >
          <span className='add-task__plus'>+</span>
          <span className='add-task__text'>Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className='add-task__main'>
          {showQuickAddTask && (
            <div className=''>
              <h2 className='header'>Quick Add Task</h2>
              <span
                className='add-task__cancel-x'
                onClick={() => {
                  setShowMain(false);
                  setShowBucketOverlay(false);
                  setShowQuickAddTask(false);
                }}
              >
                X
              </span>
            </div>
          )}
          <BucketOverlay
            setBucket={setBucket}
            showBucketOverlay={showBucketOverlay}
            setShowBucketOverlay={setShowBucketOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            type='text'
            className='add-task__content'
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button className='add-task__submit' onClick={() => addTask()}>
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className='add-task__cancel'
              onClick={() => {
                setShowMain(false);
                setShowBucketOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className='add-task__project'
            onClick={() => setShowBucketOverlay(!showBucketOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className='add-task__date'
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
