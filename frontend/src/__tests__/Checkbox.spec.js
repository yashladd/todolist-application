import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { firestore } from 'firebase';

beforeEach(cleanup); //clean the DOM

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      }));
    }),
  },
}));

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(
        <Checkbox id='1' taskDesc='Testing checkbox render' />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });
  });
});
