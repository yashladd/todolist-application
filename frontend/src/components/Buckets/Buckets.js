import React, { useState } from 'react';
import { useSelectedBucketValue, useBucketsValue } from '../../context';
import { Bucket } from '../Bucket/Bucket';

export const Buckets = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedBucket } = useSelectedBucketValue();
  const { buckets } = useBucketsValue();
  //   console.log(buckets);
  return (
    buckets &&
    buckets.map(bucket => (
      <li
        key={bucket.bucketId}
        data-doc-id={bucket.docId}
        data-test-id='project-action'
        className={
          active === bucket.bucketId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
        onClick={() => {
          setActive(bucket.bucketId);
          setSelectedBucket(bucket.bucketId);
        }}
        //Come back here
        onkeydown={() => {
          setActive(bucket.bucketId);
          setSelectedBucket(bucket.bucketId);
        }}
      >
        <Bucket bucket={bucket} />
      </li>
    ))
  );
};
