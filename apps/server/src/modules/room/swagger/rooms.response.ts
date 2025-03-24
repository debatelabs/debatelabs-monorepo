import { ApiProperty } from '@nestjs/swagger';
import { RoomResponse } from './room.response';

export class RoomsResponse {
  @ApiProperty({
    type: [RoomResponse],
  })
  data: RoomResponse[];

  @ApiProperty({
    example: 10,
    type: Number,
  })
  total: number;
}
