import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import firebaseAdmin from 'firebase-admin';
import { RequestWithJWT } from './types/Request';

@Controller()
export class AppController {
  @Get('/firebaseCustomToken')
  async getFirebaseCustomToken(
    @Req() request: RequestWithJWT,
    @Res() res: Response,
  ): Promise<void> {
    const oktaUid = request.jwt.claims.uid;

    try {
      const firebaseToken = await firebaseAdmin
        .auth()
        .createCustomToken(oktaUid);
      res.send(firebaseToken);
    } catch (err) {
      res.status(500).send('Error minting token.');
    }
  }
}
