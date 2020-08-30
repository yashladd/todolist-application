import React, { createContext, useContext, useState } from 'react';

export const SelectedBucketContext = createContext();
export const SelectedBucketProvider = ({ children }) => {
  const [selectedBucket, setSelectedBucket] = useState('INBOX');
  return (
    <SelectedBucketContext.Provider
      value={{ selectedBucket, setSelectedBucket }}
    >
      {children}
    </SelectedBucketContext.Provider>
  );
};

export const useSelectedBucketValue = () => useContext(SelectedBucketContext);
