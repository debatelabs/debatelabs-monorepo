import { ApiProperty } from '@nestjs/swagger';
import { Language } from '@prisma/client';

export class ProfileResponse {
  @ApiProperty({
    example: 'mail@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'Tom',
  })
  firstName: string;

  @ApiProperty({
    example: 'Stark',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: '2000-05-06T00:00:00.000Z',
    required: false,
  })
  birthday?: Date;

  @ApiProperty({
    example: true,
    required: false,
  })
  gender?: boolean;

  @ApiProperty({
    example: Language.UK,
  })
  language: Language;
}
