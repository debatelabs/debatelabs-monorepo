import { HttpStatus, Injectable } from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { CustomExceptionUtil } from '../../utils/custom-exception.util';
import { FriendshipActionEnum } from '../../common/enum/friendship-action.enum';
import { TUserAuth } from '../../common/type/user.type';
import { UserErrorMessage } from '../../common/messages/error/user.message';
import { FriendshipErrorMessage } from '../../common/messages/error/friendship.message';
import { FriendshipSuccessMessage } from '../../common/messages/success/friendship.message';
import { Language } from '../../common/enum/language.enum';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async requestAdd(
    requester: TUserAuth,
    recipientId: number,
    lang: Language,
  ): Promise<{ message: string }> {
    const recipientUser = await this.prisma.user.findFirst({
      where: {
        id: recipientId,
      },
      select: {
        id: true,
      },
    });
    if (!recipientUser)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        UserErrorMessage[lang].USER_NOT_FOUND,
      );

    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId: requester.id,
            recipientId,
          },
          {
            requesterId: recipientId,
            recipientId: requester.id,
          },
        ],
      },
    });
    if (friendship) {
      if (friendship.status === FriendshipStatus.ACCEPTED)
        return {
          message: FriendshipSuccessMessage[lang].ALREADY_ACCEPTED,
        };

      if (friendship.status === FriendshipStatus.PENDING) {
        if (friendship.recipientId === recipientId) {
          return {
            message: FriendshipSuccessMessage[lang].ALREADY_SENT,
          };
        } else {
          await this.prisma.friendship.update({
            where: {
              id: friendship.id,
            },
            data: {
              status: FriendshipStatus.ACCEPTED,
            },
          });
          return {
            message: FriendshipSuccessMessage[lang].ACCEPTED,
          };
        }
      }

      if (friendship.status === FriendshipStatus.REJECTED) {
        if (friendship.recipientId === recipientId) {
          throw new CustomExceptionUtil(
            HttpStatus.BAD_REQUEST,
            FriendshipErrorMessage[lang].RECIPIENT_REJECTED,
          );
        } else {
          await this.prisma.friendship.update({
            where: {
              id: friendship.id,
            },
            data: {
              status: FriendshipStatus.PENDING,
              recipient: {
                connect: {
                  id: friendship.requesterId,
                },
              },
              requester: {
                connect: {
                  id: friendship.recipientId,
                },
              },
            },
          });
        }
      }

      throw new CustomExceptionUtil(
        HttpStatus.BAD_REQUEST,
        FriendshipErrorMessage[lang].STATUS_UNKNOWN,
      );
    }

    await this.prisma.friendship.create({
      data: {
        status: FriendshipStatus.PENDING,
        requester: {
          connect: {
            id: requester.id,
          },
        },
        recipient: {
          connect: {
            id: recipientId,
          },
        },
      },
    });
    return { message: FriendshipSuccessMessage[lang].SENT };
  }

  async requestAction(
    user: TUserAuth,
    requesterId: number,
    action: FriendshipActionEnum,
    lang: Language,
  ): Promise<{ message: string }> {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        requesterId,
        recipientId: user.id,
      },
    });

    if (!friendship)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        FriendshipErrorMessage[lang].FRIENDSHIP_NOT_FOUND,
      );

    if (friendship.status === FriendshipStatus.REJECTED) {
      if (action === FriendshipActionEnum.REJECT) {
        return {
          message: FriendshipSuccessMessage[lang].ALREADY_REJECTED,
        };
      } else {
        throw new CustomExceptionUtil(
          HttpStatus.BAD_REQUEST,
          FriendshipErrorMessage[lang].ALREADY_REJECTED,
        );
      }
    }

    if (friendship.status === FriendshipStatus.ACCEPTED) {
      if (action === FriendshipActionEnum.ACCEPT) {
        return {
          message: FriendshipSuccessMessage[lang].ALREADY_ACCEPTED,
        };
      } else {
        throw new CustomExceptionUtil(
          HttpStatus.BAD_REQUEST,
          FriendshipErrorMessage[lang].ALREADY_ACCEPTED,
        );
      }
    }

    await this.prisma.friendship.update({
      where: {
        id: friendship.id,
      },
      data: {
        status:
          action === FriendshipActionEnum.ACCEPT
            ? FriendshipStatus.ACCEPTED
            : FriendshipStatus.REJECTED,
      },
    });
    return {
      message:
        action === FriendshipActionEnum.ACCEPT
          ? FriendshipSuccessMessage[lang].ACCEPTED
          : FriendshipSuccessMessage[lang].REJECTED,
    };
  }

  async delete(user: TUserAuth, friendId: number, lang: Language) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId: user.id,
            recipientId: friendId,
          },
          {
            requesterId: friendId,
            recipientId: user.id,
          },
        ],
      },
    });
    if (!friendship)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        FriendshipErrorMessage[lang].FRIENDSHIP_NOT_FOUND,
      );

    await this.prisma.friendship.delete({
      where: {
        id: friendship.id,
      },
    });
    return;
  }
}
