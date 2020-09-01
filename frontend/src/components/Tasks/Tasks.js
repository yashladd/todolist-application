import React, { useState, useEffect } from 'react';
import { useTasks } from '../../hooks';
import { collatedTasks } from '../../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers';
import { useSelectedBucketValue, useBucketsValue } from '../../context';
import { AddTask } from '../AddTask/AddTask';
import { Task } from '../Task/Task';
import { firebase } from '../../firebase';

export const Tasks = () => {
  const { selectedBucket } = useSelectedBucketValue();
  const { buckets } = useBucketsValue(selectedBucket);
  const { tasks, setTasks } = useTasks(selectedBucket);
  //   console.log(tasks);
  let bucketName = '';

  const deleteTask = id => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        console.log('inside del tasks');
        console.log(id);
        setTasks(tasks.filter(task => task.id !== id));
      });
  };

  if (collatedTasksExist(selectedBucket) && selectedBucket) {
    bucketName = getCollatedTitle(collatedTasks, selectedBucket).name;
    // console.log('bucketName 2:', bucketName);
  }
  if (
    buckets.length > 0 &&
    selectedBucket &&
    !collatedTasksExist(selectedBucket)
  ) {
    bucketName = getTitle(buckets, selectedBucket).name;
    // console.log('bucketName 1:', bucketName);
  }
  useEffect(() => {
    document.title = `${bucketName}: Todolist`;
  });
  // console.log('tasks:', tasks);
  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{bucketName}</h2>
      <ul className='tasks__list'>
        {tasks.map(task => (
          <li key={`${task.id}`} className='tasks__list-item'>
            <Task task={task} deleteTask={deleteTask} />
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
