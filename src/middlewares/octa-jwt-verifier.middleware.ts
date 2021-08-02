import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { OktaService } from '../okta.service';
import { RequestWithJWT } from '../types/Request';

@Injectable()
export class OctaJWTVerifier implements NestMiddleware {
  constructor(private readonly oktaService: OktaService) {}

  async use(
    req: RequestWithJWT,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      res.status(401);
      return next('Unauthorized');
    }

    const accessToken = match[1];

    try {
      const jwt = await this.oktaService.verifyAccessToken(
        accessToken,
        'api://default',
      );
      req.jwt = jwt;

      return next(); // Pass the request on to the main route.
    } catch (err) {
      res.status(401);
      return next('Unauthorized');
    }
  }
}
