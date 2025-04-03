import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import * as Joi from 'joi';

import { MembersRoomService } from '../services/member-room.service';
import { AuthErrorMessage } from '../../../common/messages/error/auth.message';
import { Language } from '../../../common/enum/language.enum';
import { ProtectReqType } from '../../../common/type/request.type';
import { AcceptLinkResponse } from '../swagger/invite-link.response';
import { Lang } from '../../../common/decorator/lang.decorator';

@ApiTags('Room')
@Controller('room/member')
export class MembersRoomController {
  constructor(private membersRoomService: MembersRoomService) {}

  @ApiOperation({
    summary: 'Accept invite link',
    description: 'Accept invite link',
  })
  @ApiOkResponse({
    description: `Successfully accepted`,
    type: AcceptLinkResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/invite/accept/:roomId')
  @HttpCode(HttpStatus.OK)
  async acceptInvite(
    @Req() req: ProtectReqType,
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
    @Lang() lang: Language,
  ) {
    return this.membersRoomService.acceptInvite(req.user, roomId, lang);
  }
}
