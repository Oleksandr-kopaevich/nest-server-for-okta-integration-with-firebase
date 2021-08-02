import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { JWTT } from './types/Request';

@Injectable()
export class OktaService {
  private oktaJwtVerifier;

  constructor(private configService: ConfigService) {
    const OKTA_ORG_URL = `https://${this.configService.get<string>(
      'OKTA_ORG_URL',
    )}`;

    this.oktaJwtVerifier = new OktaJwtVerifier({
      issuer: `${OKTA_ORG_URL}/oauth2/default`,
    });
  }

  verifyAccessToken = (accessToken: string, clientAPI: string): JWTT =>
    this.oktaJwtVerifier.verifyAccessToken(accessToken, clientAPI);
}
