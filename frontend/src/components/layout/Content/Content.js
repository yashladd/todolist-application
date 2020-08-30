import React from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Tasks } from '../../Tasks/Tasks';

export const Content = () => {
  return (
    <section>
      <Sidebar />
      <Tasks />
    </section>
  );
};
