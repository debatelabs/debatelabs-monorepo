import { ApiProperty } from '@nestjs/swagger';
import { Language } from '@prisma/client';

export class AuthorizationResponseType {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'mail@example.com' })
  email: string;

  @ApiProperty({ example: '/api/static/user/4/avatar.jpg' })
  avatar: string;

  @ApiProperty({ example: 'Jon' })
  firstName: string;

  @ApiProperty({ example: 'Smith', required: false })
  lastName?: string;

  @ApiProperty({ example: Language.UK, required: false, default: Language.EN })
  language?: Language;

  @ApiProperty({ example: 'secret_string' })
  accessToken: string;
}
