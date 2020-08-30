import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import React from 'react';
import moment from 'moment';

export const useTasks = selectedBucket => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  useEffect(() => {
    let unsubsribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'd83b6768-e9d7');
    unsubsribe =
      selectedBucket && !collatedTasksExist(selectedBucket)
        ? (unsubsribe = unsubsribe.where('bucketId', '==', selectedBucket))
        : selectedBucket === 'TODAY'
        ? (unsubsribe = unsubsribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedBucket == 'INBOX' || selectedBucket === 0
        ? (unsubsribe = unsubsribe.where('date', '==', ''))
        : unsubsribe;

    unsubsribe = unsubsribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedBucket === 'NEXT_7'
          ? newTasks.filter(
              task =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });
    return () => unsubsribe();
  }, [selectedBucket]);

  return { tasks, archivedTasks };
};

export const useBuckets = () => {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('buckets')
      .where('userId', '==', 'd83b6768-e9d7')
      .orderBy('bucketId')
      .get()
      .then(snapshot => {
        const allBuckets = snapshot.docs.map(bucket => ({
          ...bucket.data(),
          docId: bucket.id,
        }));

        if (JSON.stringify(allBuckets) !== JSON.stringify(buckets)) {
          setBuckets(allBuckets);
        }
      });
  }, [buckets]);

  return { buckets, setBuckets };
};
