import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus, RoomType } from '@prisma/client';

class User {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Tom',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'api/static/1/avatar.webp',
    type: String,
  })
  avatar: string;
}

class Members {
  @ApiProperty({
    example: false,
    type: Boolean,
  })
  isJudge: boolean;

  @ApiProperty({
    example: '50e68e75-aa0b-4f59-a592-c6424864aba6',
    type: String,
  })
  teamId: string;

  @ApiProperty({
    type: User,
  })
  user: User;
}

class TeamDto {
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
    example: [
      {
        userId: 3,
      },
    ],
  })
  roomUsers: Array<{
    userId: number;
  }>;
}

export class RoomResponse {
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

  @ApiProperty({
    type: [TeamDto],
  })
  teams: TeamDto[];

  @ApiProperty({
    type: [Members],
  })
  members: Members[];
}
