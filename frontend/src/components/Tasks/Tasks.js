import React, { useState, useEffect } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTasks } from '../../hooks';
import { collatedTasks } from '../../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers';
import { useSelectedBucketValue, useBucketsValue } from '../../context';

export const Tasks = () => {
  const { selectedBucket } = useSelectedBucketValue();
  const { buckets } = useBucketsValue(selectedBucket);
  const { tasks } = useTasks(selectedBucket);
  //   console.log(tasks);
  let bucketName = '';
  if (buckets && selectedBucket && !collatedTasksExist(selectedBucket)) {
    bucketName = getTitle(buckets, selectedBucket).name;
    console.log('bucketName 1:', bucketName);
  }
  if (collatedTasksExist(selectedBucket) && selectedBucket) {
    bucketName = getCollatedTitle(collatedTasks, selectedBucket).name;
    console.log('bucketName 2:', bucketName);
  }
  useEffect(() => {
    document.title = `${bucketName}: Todolist`;
  });
  console.log('tasks:', tasks);
  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{bucketName}</h2>
      <ul className='tasks__list'>
        {tasks.map(task => (
          <li key={`{$task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
