import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseType {
  @ApiProperty({ example: 'mail@example.com' })
  email: string;

  @ApiProperty({ example: 'Jon' })
  firstName: string;

  @ApiProperty({ example: 'Smith', required: false })
  lastName: string;

  @ApiProperty({ example: 'secret_string' })
  accessToken: string;
}
