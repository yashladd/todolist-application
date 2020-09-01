import React from 'react';
import { Header } from './components/Header/Header';
import { Content } from './components/layout/Content/Content';
import { BucketsProvider, SelectedBucketProvider } from './context';

export const App = () => {
  return (
    <SelectedBucketProvider>
      <BucketsProvider>
        <div className='App'>
          <Header />
          <Content />
        </div>
      </BucketsProvider>
    </SelectedBucketProvider>
  );
};
