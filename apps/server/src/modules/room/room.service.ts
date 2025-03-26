import { HttpStatus, Injectable } from '@nestjs/common';
import { Room, RoomStatus, RoomType } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { TUserAuth } from '../../common/type/user.type';
import { RoomCreateDto } from './dto/room.create.dto';
import { CustomExceptionUtil } from '../../utils/custom-exception.util';
import { RoomErrorMessage } from '../../common/messages/error/room.message';
import { RoomUpdateDto } from './dto/room.update.dto';
import { QuerySearchDto } from '../../common/dto/query-search.dto';
import { Language } from '../../common/enum/language.enum';
import { RoomsResponse } from './swagger/rooms.response';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: TUserAuth, body: RoomCreateDto): Promise<Room> {
    return this.prisma.$transaction(async (tx) => {
      const newRoom = await tx.room.create({
        data: {
          ...body,
          status: RoomStatus.SETTING,
          creator: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await tx.roomUser.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          room: {
            connect: {
              id: newRoom.id,
            },
          },
          isJudge: false,
        },
      });

      return newRoom;
    });
  }

  async getById(user: TUserAuth, id: string, lang: Language): Promise<Room> {
    const room = await this.prisma.room.findFirst({
      where: {
        id,
      },
    });
    if (!room)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        RoomErrorMessage[lang].ROOM_NOT_FOUND,
      );
    if (room.type === RoomType.PUBLIC || room.creatorId === user.id)
      return room;

    const roomUser = await this.prisma.roomUser.findFirst({
      where: {
        roomId: room.id,
        userId: user.id,
      },
    });
    if (!roomUser)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].ACCESS_DENIED,
      );
    return room;
  }

  async getAll(
    user: TUserAuth,
    { range, sort, filter }: QuerySearchDto,
    lang: Language,
  ): Promise<RoomsResponse> {
    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.room.findMany({
          where: {
            OR: [
              {
                type: RoomType.PUBLIC,
                id: filter.id && {
                  contains: filter.id,
                  mode: 'insensitive',
                },
              },
              {
                id: filter.id && {
                  contains: filter.id,
                  mode: 'insensitive',
                },
                type: RoomType.PRIVATE,
                members: {
                  some: {
                    userId: user.id,
                  },
                },
              },
            ],
          },
          orderBy: {
            [sort[0]]: sort[1],
          },
          take: range[1] - range[0] + 1,
          skip: range[0] - 1,
        }),
        this.prisma.room.count({
          where: {
            OR: [
              {
                type: RoomType.PUBLIC,
                id: filter.id && {
                  contains: filter.id,
                  mode: 'insensitive',
                },
              },
              {
                id: filter.id && {
                  contains: filter.id,
                  mode: 'insensitive',
                },
                type: RoomType.PRIVATE,
                members: {
                  some: {
                    userId: user.id,
                  },
                },
              },
            ],
          },
        }),
      ]);

      return {
        data,
        total,
      };
    } catch {
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].GET_MANY,
      );
    }
  }

  async update(
    user: TUserAuth,
    id: string,
    body: RoomUpdateDto,
    lang: Language,
  ): Promise<Room> {
    const room = await this.getByIdUserOwner(user.id, id, lang);

    return await this.prisma.room.update({
      where: { id: room.id },
      data: body,
    });
  }

  async deleteById(user: TUserAuth, id: string, lang: Language): Promise<void> {
    const room = await this.getByIdUserOwner(user.id, id, lang);
    await this.prisma.room.delete({
      where: {
        id: room.id,
      },
    });
    return;
  }

  private async getByIdUserOwner(
    userId: number,
    roomId: string,
    lang: Language,
  ): Promise<Room> {
    const room = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
    });
    if (!room)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        RoomErrorMessage[lang].ROOM_NOT_FOUND,
      );
    if (room.creatorId !== userId)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].DONT_OWNER_ROOM,
      );
    return room;
  }
}
