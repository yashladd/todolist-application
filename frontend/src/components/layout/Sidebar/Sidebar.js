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
        <li data-testid='inbox' className='inbox'>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li data-testid='today' className='today'>
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li data-testid='next_7' className='next_7'>
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className='sidebar__middle'>
        <span>
          <FaChevronDown />
        </span>
        <h2>Buckets</h2>
      </div>
      <ul className='sidebar__projects'>{showBuckets && <Buckets />}</ul>
      {showBuckets && <AddBucket />}
    </div>
  );
};
