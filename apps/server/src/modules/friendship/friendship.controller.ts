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

import { FriendshipService } from './friendship.service';
import { RequestResponse } from './swagger/request.response';
import { ProtectReqType } from '../../common/type/request.type';
import { FriendshipActionEnum } from '../../common/enum/friendship-action.enum';
import { AuthErrorMessage } from '../../common/messages/error/auth.message';
import { Language } from '../../common/enum/language.enum';
import { Lang } from '../../common/decorator/lang.decorator';

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
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Post('/request/:recipient_id')
  @HttpCode(HttpStatus.OK)
  async requestAdd(
    @Req() req: ProtectReqType,
    @Param('recipient_id', new JoiPipe(Joi.number().integer().required()))
    recipientId: number,
    @Lang() lang: Language,
  ): Promise<{ message: string }> {
    return this.friendshipService.requestAdd(req.user, recipientId, lang);
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
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
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
    @Lang() lang: Language,
  ): Promise<{ message: string }> {
    return this.friendshipService.requestAction(
      req.user,
      requesterId,
      actionReq,
      lang,
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
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Delete('/:friend_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Req() req: ProtectReqType,
    @Param('friend_id', new JoiPipe(Joi.number().integer().required()))
    friendId: number,
    @Lang() lang: Language,
  ): Promise<void> {
    return this.friendshipService.delete(req.user, friendId, lang);
  }
}
