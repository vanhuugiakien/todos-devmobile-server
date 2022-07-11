import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import * as admin from 'firebase-admin/firestore';

@Injectable()
export class UserService {
  private db = admin.getFirestore().collection('users');

  async register(email: string, password: string, photoUrl: string) {
    const query = await (
      await this.db.where('email', '==', email).get()
    ).docs.map((doc) => doc.data());
    if (query.length == 0) {
      const timestamp = new Date().getTime();
      const id = parseInt((Math.random() * timestamp).toString()).toString();
      const user: User = {
        id: id,
        email: email,
        password: password,
        photoUrl: photoUrl,
        name: email.split('@')[0],
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return await this.db.doc(id.toString()).set(user);
    }
    return { message: 'User already exists' };
  }

  async update(id: string, data: any) {
    const user = {
      ...data,
      updatedAt: new Date().getTime(),
    };
    return await this.db.doc(id.toString()).update(user);
  }
  async get(id: string) {
    const result = await (await this.db.doc(id).get()).data();
    if (!result) {
      return { message: 'User not found' };
    }
    return result;
  }
  async getAll() {
    return await (await this.db.get()).docs.map((doc) => doc.data());
  }
  async search(keyword: string) {
    return (await this.db.where('name', '==', keyword).get()).docs.map(
      (doc) => {
        let result = { ...doc.data() };
        delete result.password;
        return result;
      },
    );
  }
}
