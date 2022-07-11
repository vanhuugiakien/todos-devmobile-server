import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin/firestore';
import { Task } from 'src/models/task.model';
import { Todo } from 'src/models/todo.model';

@Injectable()
export class TodoService {
  db = admin.getFirestore().collection('todos');

  async getAll() {
    return (await this.db.get()).docs.map((doc) => doc.data());
  }
  async get(id: string) {
    return (await this.db.doc(id.toString()).get()).data();
  }
  async getFromUser(userId: string) {
    return (
      await this.db.where('participants', 'array-contains', userId).get()
    ).docs.map((doc) => {
      console.log(doc.data());
      return doc.data();
    });
  }
  async create(job: Todo) {
    return await this.db.doc(job.id).set(job);
  }
  async update(id: string, job: Todo) {
    return await this.db
      .doc(id)
      .update({ ...job, updatedDate: new Date().getTime() });
  }
  async delete(id: string) {
    return await this.db.doc(id.toString()).delete();
  }
  async addTask(id: string, task: Task) {
    const timestamp = new Date().getTime();
    const newTask = {
      ...task,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    return await this.db.doc(id.toString()).update({
      tasks: admin.FieldValue.arrayUnion(newTask),
      updatedDate: timestamp,
    });
  }
}
