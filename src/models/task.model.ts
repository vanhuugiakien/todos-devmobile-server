/* eslint-disable prettier/prettier */
import { Priority } from './priority.model';

export interface Task {
  id: string;
  content: string;
  assigneeId: string;
  priority: Priority;
  deadline: number;
  isCompleted: boolean;
  createdAt: number;
  updatedAt: number;
}
