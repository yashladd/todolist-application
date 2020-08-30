import React from 'react';
import { useBucketsValue } from '../../context';

export const BucketOverlay = ({
  setBucket,
  showBucketOverlay,
  setShowBucketOverlay,
}) => {
  const { buckets } = useBucketsValue();
  return (
    buckets &&
    showBucketOverlay && (
      <div className='project-overlay'>
        <ul className='project-overlay__list'>
          {buckets.map(bucket => (
            <li
              key={bucket.bucketId}
              onClick={() => {
                setBucket(bucket.bucketId);
                setShowBucketOverlay(false);
              }}
            >
              {bucket.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
