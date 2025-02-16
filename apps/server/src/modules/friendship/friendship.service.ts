import { HttpStatus, Injectable } from '@nestjs/common';
import { User, FriendshipStatus } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { CustomExceptionUtil } from '../../utils/custom-exception.util';
import { ResponseErrorEnum } from '../../common/enum/response-message.enum';
import { FriendshipActionEnum } from '../../common/enum/friendship-action.enum';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async requestAdd(
    requester: User,
    recipientId: number,
  ): Promise<{ message: string }> {
    const recipientUser = await this.prisma.user.findFirst({
      where: {
        id: recipientId,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (!recipientUser)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        ResponseErrorEnum.USER_NOT_FOUND,
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
        return { message: 'Friendship already accepted' };

      if (friendship.status === FriendshipStatus.PENDING) {
        if (friendship.recipientId === recipientId) {
          return { message: 'Request has already been sent' };
        } else {
          await this.prisma.friendship.update({
            where: {
              id: friendship.id,
            },
            data: {
              status: FriendshipStatus.ACCEPTED,
            },
          });
          return { message: 'Friendship accepted' };
        }
      }

      if (friendship.status === FriendshipStatus.REJECTED) {
        if (friendship.recipientId === recipientId) {
          throw new CustomExceptionUtil(
            HttpStatus.BAD_REQUEST,
            'Recipient rejected your request',
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
        'Friendship status is unknown',
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
    return { message: 'Request successfully sent' };
  }

  async requestAction(
    user: User,
    requesterId: number,
    action: FriendshipActionEnum,
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
        ResponseErrorEnum.FRIENDSHIP_NOT_FOUND,
      );

    if (friendship.status === FriendshipStatus.REJECTED) {
      if (action === FriendshipActionEnum.REJECT) {
        return { message: 'Request already rejected' };
      } else {
        throw new CustomExceptionUtil(
          HttpStatus.BAD_REQUEST,
          'Request already rejected',
        );
      }
    }

    if (friendship.status === FriendshipStatus.ACCEPTED) {
      if (action === FriendshipActionEnum.ACCEPT) {
        return { message: 'Friendship already accepted' };
      } else {
        throw new CustomExceptionUtil(
          HttpStatus.BAD_REQUEST,
          'Request already accepted',
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
      message: `Friendship ${action === FriendshipActionEnum.ACCEPT ? 'accepted' : 'rejected'}`,
    };
  }

  async delete(user: User, friendId: number) {
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
        ResponseErrorEnum.FRIENDSHIP_NOT_FOUND,
      );

    await this.prisma.friendship.delete({
      where: {
        id: friendship.id,
      },
    });
    return;
  }
}
