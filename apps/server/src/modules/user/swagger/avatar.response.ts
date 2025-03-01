import { ApiProperty } from '@nestjs/swagger';

export class AvatarResponse {
  @ApiProperty({
    example: '/api/static/user/13/avatar.jpg',
  })
  url: string;
}
