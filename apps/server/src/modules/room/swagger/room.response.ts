import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus, RoomType } from '@prisma/client';

export class RoomResponse {
  @ApiProperty({
    example: '50e68e75-aa0b-4f59-a592-c6424864aba6',
  })
  id: string;

  @ApiProperty({
    example: 4,
  })
  creatorId: number;

  @ApiProperty({
    example: 'Topic of conversation',
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
    required: false,
  })
  startAt?: Date;

  @ApiProperty({
    example: 1742477528,
    required: true,
  })
  createAt?: Date;

  @ApiProperty({
    example: 4,
  })
  teamCount: number;

  @ApiProperty({
    example: 2,
  })
  membersCount: number;
}
