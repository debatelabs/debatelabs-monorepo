import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import * as Joi from 'joi';
import { User } from '@prisma/client';

import { FriendshipService } from './friendship.service';
import { ResponseErrorEnum } from '../../common/enum/response-message.enum';
import { RequestResponse } from './swagger/request.response';
import { ProtectReqType } from '../../common/type/request.type';
import { FriendshipActionEnum } from '../../common/enum/friendship-action.enum';

@ApiTags('Friendship')
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @ApiOperation({
    summary: 'Friend request',
    description: 'Send friend request',
  })
  @ApiOkResponse({
    description: 'Successfully sent',
    type: RequestResponse,
  })
  @ApiParam({
    name: 'recipient_id',
    type: Number,
    description: 'User ID Recipient',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({ description: ResponseErrorEnum.USER_BLOCKED })
  @Post('/request/:recipient_id')
  @HttpCode(HttpStatus.OK)
  async requestAdd(
    @Req() req: ProtectReqType,
    @Param('recipient_id', new JoiPipe(Joi.number().integer().required()))
    recipientId: number,
  ): Promise<{ message: string }> {
    return this.friendshipService.requestAdd(req.user as User, recipientId);
  }

  @ApiOperation({
    summary: 'Friend request action',
    description: 'Accept or reject friend request',
  })
  @ApiOkResponse({
    description: 'Successfully action',
    type: RequestResponse,
  })
  @ApiParam({
    name: 'action_request',
    enum: [FriendshipActionEnum.ACCEPT, FriendshipActionEnum.REJECT],
    description: 'Action on the request',
  })
  @ApiParam({
    name: 'requester_id',
    type: Number,
    description: 'User ID who sent a friend request',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({ description: ResponseErrorEnum.USER_BLOCKED })
  @Patch('/action/:action_request/:requester_id')
  @HttpCode(HttpStatus.OK)
  async requestAction(
    @Req() req: ProtectReqType,
    @Param(
      'action_request',
      new JoiPipe(
        Joi.string()
          .valid(FriendshipActionEnum.ACCEPT, FriendshipActionEnum.REJECT)
          .required(),
      ),
    )
    actionReq: FriendshipActionEnum,
    @Param('requester_id', new JoiPipe(Joi.number().integer().required()))
    requesterId: number,
  ): Promise<{ message: string }> {
    return this.friendshipService.requestAction(
      req.user as User,
      requesterId,
      actionReq,
    );
  }

  @ApiOperation({
    summary: 'Delete friendship',
    description: 'Delete a friend',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @ApiParam({
    name: 'friend_id',
    type: Number,
    description: 'User ID. User is a friend',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({ description: ResponseErrorEnum.USER_BLOCKED })
  @Delete('/:friend_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Req() req: ProtectReqType,
    @Param('friend_id', new JoiPipe(Joi.number().integer().required()))
    friendId: number,
  ): Promise<void> {
    return this.friendshipService.delete(req.user as User, friendId);
  }
}
