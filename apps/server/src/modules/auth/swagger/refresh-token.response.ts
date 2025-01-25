import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({ example: 'secret_string' })
  accessToken: string;
}
