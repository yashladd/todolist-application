import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className='task-date'>
      <ul className='task-date__list'>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
          }}
        >
          <span>
            <FaSun />
          </span>
          <span>Tomorrow</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'));
          }}
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next Week</span>
        </li>
      </ul>
    </div>
  );
