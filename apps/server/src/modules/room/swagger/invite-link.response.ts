import { ApiProperty } from '@nestjs/swagger';

export class AcceptLinkResponse {
  @ApiProperty({
    example: 'Message ...',
    type: String,
  })
  message: string;
}
