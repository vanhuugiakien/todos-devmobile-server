/* eslint-disable prettier/prettier */
import { Priority } from './priority.model';
import { Task } from './task.model';
export interface Todo {
  id: string;
  name: string;
  description: string;
  createdDate: number;
  updatedDate: number;
  priority: Priority;
  ownerId: string;
  isDone: boolean;
  participants: string[];
  tasks: Task[];
}
