import { collatedTasks } from '../constants';

export const collatedTasksExist = seletedBucket =>
  collatedTasks.find(task => task.key === seletedBucket);
