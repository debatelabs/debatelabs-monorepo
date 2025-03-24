import { JWTPayload } from 'jose';

export interface TokenPayload extends JWTPayload {
  id: number;
  name: string;
}

export interface JwtPayloadDTO {
  id: number;
  name: string;
}
