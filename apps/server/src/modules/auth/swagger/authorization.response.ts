import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationResponseType {
  @ApiProperty({ example: 'secret_string' })
  accessToken: string;
}
