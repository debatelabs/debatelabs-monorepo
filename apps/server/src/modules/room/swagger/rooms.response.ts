import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus, RoomType } from '@prisma/client';

class RoomResponse {
  @ApiProperty({
    example: '50e68e75-aa0b-4f59-a592-c6424864aba6',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 4,
    type: Number,
  })
  creatorId: number;

  @ApiProperty({
    example: 'Topic of conversation',
    type: String,
  })
  topic: string;

  @ApiProperty({
    example: Object.values(RoomStatus).join(', '),
    required: true,
  })
  status: RoomStatus;

  @ApiProperty({
    example: Object.values(RoomType).join(', '),
    required: true,
  })
  type: RoomType;

  @ApiProperty({
    example: 1742477528,
    type: Date,
    required: false,
  })
  startAt?: Date;

  @ApiProperty({
    example: 1742477528,
    type: Date,
    required: true,
  })
  createAt?: Date;

  @ApiProperty({
    example: 4,
    type: Number,
  })
  teamCount: number;

  @ApiProperty({
    example: 2,
    type: Number,
  })
  membersCount: number;
}

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
