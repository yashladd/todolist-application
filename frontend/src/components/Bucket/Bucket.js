import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useBucketsValue, useSelectedBucketValue } from '../../context';
import { firebase } from '../../firebase';

export const Bucket = ({ bucket }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { buckets, setBuckets } = useBucketsValue();
  const { setSelectedBucket } = useSelectedBucketValue();
  const deleteBucket = docId => {
    firebase
      .firestore()
      .collection('buckets')
      .doc(docId)
      .delete()
      .then(() => {
        setBuckets([...buckets]);
        setSelectedBucket('INBOX');
      });
  };
  return (
    <>
      <span className='sidebar__dot'>.</span>
      <span className='sidebar__project-name'>{bucket.name}</span>
      <span
        className='sidebar__project-delete'
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className='project-delete-modal'>
            <div className='project-delete-modal__inner'>
              <p>Are you sure you want to delete this bucket?</p>
              <button
                type='button'
                onClick={() => {
                  deleteBucket(bucket.docId);
                }}
              >
                Delete
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
