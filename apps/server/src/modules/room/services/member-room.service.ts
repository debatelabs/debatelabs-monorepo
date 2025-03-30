import { HttpStatus, Injectable } from '@nestjs/common';
import { RoomStatus } from '@prisma/client';

import { PrismaService } from '../../../prisma.service';
import { TUserAuth } from '../../../common/type/user.type';
import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { RoomErrorMessage } from '../../../common/messages/error/room.message';
import { Language } from '../../../common/enum/language.enum';
import { RoomSuccessMessage } from '../../../common/messages/success/room.message';

@Injectable()
export class MembersRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async acceptInvite(user: TUserAuth, roomId: string, lang: Language) {
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: {
        members: true,
      },
    });
    if (!room)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        RoomErrorMessage[lang].ROOM_NOT_FOUND,
      );

    const member = room.members.find((m) => m.userId === user.id);
    if (member)
      return {
        message: RoomSuccessMessage[lang].ALREADY_EXIST_MEMBER,
      };

    if (room.members.length >= room.teamCount * room.membersCount)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].MAX_MEMBERS,
      );

    if (room.status === RoomStatus.SETTING)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].ROOM_INVITE_SETTINGS,
      );

    if (room.status === RoomStatus.READY)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].ROOM_INVITE_READY,
      );

    if (room.status === RoomStatus.PLAYING)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].ROOM_INVITE_PLAYING,
      );

    if (room.status === RoomStatus.DONE)
      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        RoomErrorMessage[lang].ROOM_INVITE_DONE,
      );

    await this.prisma.roomUser.create({
      data: {
        room: {
          connect: {
            id: roomId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      message: RoomSuccessMessage[lang].ADD_MEMBER,
    };
  }
}
