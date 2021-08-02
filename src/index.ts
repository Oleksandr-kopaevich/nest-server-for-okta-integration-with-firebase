import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as express from 'express';
import firebaseAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import * as firebaseConfig from './firebase.config.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    firebaseConfig as firebaseAdmin.ServiceAccount,
  ),
});

const expressServer = express();
expressServer.use(
  cors({
    origin: 'https://explore-firebase-37b42.web.app',
    allowedHeaders: '*',
  }),
);

const createNestServer = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
};

export const api = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    await createNestServer(expressServer);
    expressServer(request, response);
  });
