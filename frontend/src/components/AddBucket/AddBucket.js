import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { generatePushId } from '../../helpers';
import { useBucketsValue } from '../../context';

export const AddBucket = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [bucketName, setBucketName] = useState('');
  const bucketId = generatePushId();
  const { setBuckets } = useBucketsValue();

  const addBucket = () => {
    bucketName &&
      firebase
        .firestore()
        .collection('buckets')
        .add({
          bucketId,
          name: bucketName,
          userId: 'd83b6768-e9d7',
        })
        .then(() => {
          setBuckets([]);
          setBucketName('');
          setShow(false);
        });
  };

  return (
    <div className='add-project' data-testid='add-project'>
      {show && (
        <div className='add-project__input'>
          <input
            value={bucketName}
            onChange={e => setBucketName(e.target.value)}
            className='add-project__name'
            type='text'
            placeholder='Name your bucket'
          />
          <button
            className='add-project__submit'
            type='button'
            onClick={() => addBucket()}
          >
            Add Bucket
          </button>
          <span className='add-project__cancel' onClick={() => setShow(false)}>
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span className='add-project__text' onClick={() => setShow(!show)}>
        Add Bucket
      </span>
    </div>
  );
};
