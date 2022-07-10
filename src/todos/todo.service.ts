import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin/firestore';
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
}
