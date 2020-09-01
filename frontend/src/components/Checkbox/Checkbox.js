import React from 'react';
import { firebase } from '../../firebase';

export const Checkbox = ({ id, archived }) => {
  const togglearchiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: !archived,
    });
  };
  return (
    <div>
      <div
        className='checkbox-holder'
        data-testid='checkbox-action'
        onClick={() => togglearchiveTask()}
      >
        <span className='checkbox'></span>
      </div>
    </div>
  );
};
