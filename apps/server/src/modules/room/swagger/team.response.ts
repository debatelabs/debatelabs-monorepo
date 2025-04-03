import { ApiProperty } from '@nestjs/swagger';

export class TeamResponse {
  @ApiProperty({
    example: '50e68e75-aa0b-4f59-a592-c6424864aba6',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'Team 1',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: '50e68e75-aa0b-4f59-a592-c6424864aba6',
    type: String,
  })
  roomId: string;
}
