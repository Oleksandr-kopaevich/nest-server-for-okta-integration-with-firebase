import { Request } from 'express';

export type JWTT = { claims: { uid: string } };

export type RequestWithJWT = Request & {
  jwt?: JWTT;
};
