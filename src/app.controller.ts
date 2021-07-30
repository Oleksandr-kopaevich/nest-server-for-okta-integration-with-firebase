import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import firebaseAdmin from 'firebase-admin';
import { Request, Response } from 'express';

const serviceAccount = require('../.private/serviceAccountKey.json');

export const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/firebaseCustomToken')
  async getFirebaseCustomToken(
    @Req() request: Request,
    @Res() res: Response,
  ): Promise<void> {
    //@ts-ignore
    const oktaUid = request.jwt.claims.uid;

    try {
      const firebaseToken = await firebaseApp.auth().createCustomToken(oktaUid);
      console.log('firebaseToken', firebaseToken);
      res.send(firebaseToken);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Error minting token.');
    }
  }
}
