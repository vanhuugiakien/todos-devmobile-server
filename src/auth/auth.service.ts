import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin/firestore';

@Injectable()
export class AuthService {
  private db = admin.getFirestore().collection('users');
  async login(email: string, password: string) {
    const query = await (
      await this.db.where('email', '==', email).get()
    ).docs.map((doc) => doc.data());
    if (query.length != 0) {
      const account = query[0];
      if (account.password == password) {
        delete account.password;
        return {
          message: 'Login successful!!!',
          statusCode: 200,
          data: account,
        };
      }
      return { message: 'Login failed!!!', statusCode: 400 };
    }
    return {
      message: 'Account not found!!!',
      statusCode: 400,
    };
  }
}
