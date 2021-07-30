import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
require('dotenv').config();

const OKTA_ORG_URL = process.env.OKTA_ORG_URL;
console.log("OKTA_ORG_URL", OKTA_ORG_URL)

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${OKTA_ORG_URL}/oauth2/default`,
});

@Injectable()
export class OctaJWTVerifier implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      res.status(401);
      return next('Unauthorized');
    }

    const accessToken = match[1];

    try {
      const jwt = await oktaJwtVerifier.verifyAccessToken(
        accessToken,
        'api://default',
      );
      //@ts-ignore
      req.jwt = jwt;

      return next(); // Pass the request on to the main route.
    } catch (err) {
      console.log(err.message);
      res.status(401);
      return next('Unauthorized');
    }
  }
}
