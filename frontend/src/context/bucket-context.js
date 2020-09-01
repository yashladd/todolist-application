import React, { createContext, useContext } from 'react';
import { useBuckets } from '../hooks';

export const BucketsContext = createContext();
export const BucketsProvider = ({ children }) => {
  const { buckets, setBuckets } = useBuckets();
  return (
    <BucketsContext.Provider value={{ buckets, setBuckets }}>
      {children}
    </BucketsContext.Provider>
  );
};

export const useBucketsValue = () => useContext(BucketsContext);
