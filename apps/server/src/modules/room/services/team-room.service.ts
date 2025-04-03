import { HttpStatus, Injectable } from '@nestjs/common';
import { Team } from '@prisma/client';

import { PrismaService } from '../../../prisma.service';
import { TUserAuth } from '../../../common/type/user.type';
import { Language } from '../../../common/enum/language.enum';
import { RoomService } from './room.service';
import { TeamCreateDto, TeamUpdateDto } from '../dto/team-room.dto';
import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { TeamErrorMessage } from '../../../common/messages/error/team.message';

@Injectable()
export class TeamRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
  ) {}

  async createTeam(
    user: TUserAuth,
    roomId: string,
    { name }: TeamCreateDto,
    lang: Language,
  ): Promise<Team> {
    const room = await this.roomService.getByIdUserOwner(user.id, roomId, lang);

    return this.prisma.team.create({
      data: {
        name,
        room: {
          connect: {
            id: room.id,
          },
        },
      },
    });
  }

  async getManyTeam(roomId: string): Promise<Team[]> {
    return await this.prisma.team.findMany({
      where: {
        roomId,
      },
    });
  }

  async updateTeamById(
    user: TUserAuth,
    teamId: string,
    { name }: TeamUpdateDto,
    lang: Language,
  ) {
    const team = await this.getTeamByOwner(user.id, teamId, lang);

    return this.prisma.team.update({
      where: { id: team.id },
      data: { name },
    });
  }

  async deleteTeamById(user: TUserAuth, teamId: string, lang: Language) {
    const team = await this.getTeamByOwner(user.id, teamId, lang);

    await this.prisma.team.delete({
      where: { id: team.id },
    });
    return;
  }

  private async getTeamByOwner(
    userId: number,
    teamId: string,
    lang: Language,
  ): Promise<Team> {
    const team = await this.prisma.team.findFirst({
      where: {
        id: teamId,
      },
      include: {
        room: {
          select: {
            creatorId: true,
          },
        },
      },
    });
    if (!team)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        TeamErrorMessage[lang].TEAM_NOT_FOUND,
      );
    if (team.room.creatorId !== userId)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        TeamErrorMessage[lang].DONT_OWNER_ROOM,
      );
    return team;
  }
}
