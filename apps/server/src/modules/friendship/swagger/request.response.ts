import { ApiProperty } from '@nestjs/swagger';

export class RequestResponse {
  @ApiProperty({
    example: 'string',
  })
  message: string;
}
