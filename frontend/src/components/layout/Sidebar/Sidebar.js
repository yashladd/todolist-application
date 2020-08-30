import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedBucketValue } from '../../../context';
import { Buckets } from '../../Buckets/Buckets';
import { AddBucket } from '../../AddBucket/AddBucket';

export const Sidebar = () => {
  const { setSelectedBucket } = useSelectedBucketValue();
  const [active, setActive] = useState('inbox');
  const [showBuckets, setShowBuckets] = useState(true);
  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li
          data-testid='inbox'
          className={active === 'inbox' ? 'active' : undefined}
          onClick={() => {
            setActive('inbox');
            setSelectedBucket('INBOX');
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          data-testid='today'
          className={active === 'today' ? 'active' : undefined}
          onClick={() => {
            setActive('today');
            setSelectedBucket('TODAY');
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          data-testid='next_7'
          className={active === 'next_7' ? 'active' : undefined}
          onClick={() => {
            setActive('next_7');
            setSelectedBucket('NEXT_7');
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className='sidebar__middle'
        onClick={() => setShowBuckets(!showBuckets)}
      >
        <span>
          <FaChevronDown
            className={!showBuckets ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Buckets</h2>
      </div>
      <ul className='sidebar__projects'>{showBuckets && <Buckets />}</ul>
      {showBuckets && <AddBucket />}
    </div>
  );
};
