import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse {
  @ApiProperty({
    example: 'mail@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'Tom',
  })
  name: string;

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
}
