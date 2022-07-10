import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as keys from '../keys/admin.json';
async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(keys as admin.ServiceAccount),
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
