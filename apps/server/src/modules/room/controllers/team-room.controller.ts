import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { Team } from '@prisma/client';
import * as Joi from 'joi';

import { AuthErrorMessage } from '../../../common/messages/error/auth.message';
import { Language } from '../../../common/enum/language.enum';
import { ProtectReqType } from '../../../common/type/request.type';
import { Lang } from '../../../common/decorator/lang.decorator';
import { TeamRoomService } from '../services/team-room.service';
import { TeamCreateDto, TeamUpdateDto } from '../dto/team-room.dto';
import { TeamResponse } from '../swagger/team.response';

@ApiTags('Room')
@Controller('room/team')
export class TeamRoomController {
  constructor(private readonly teamRoomService: TeamRoomService) {}

  @ApiOperation({
    summary: 'Create team',
    description: 'Create team in room',
  })
  @ApiOkResponse({
    description: `Successfully created`,
    type: TeamResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Post('/:roomId')
  @HttpCode(HttpStatus.OK)
  async createTeam(
    @Req() req: ProtectReqType,
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
    @Body() body: TeamCreateDto,
    @Lang() lang: Language,
  ) {
    return this.teamRoomService.createTeam(req.user, roomId, body, lang);
  }

  @ApiOperation({
    summary: 'Get many teams',
    description: 'Get many teams',
  })
  @ApiOkResponse({
    description: 'Successfully got teams',
    type: [TeamResponse],
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/:roomId')
  @HttpCode(HttpStatus.OK)
  async getMany(
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
  ): Promise<Team[]> {
    return this.teamRoomService.getManyTeam(roomId);
  }

  @ApiOperation({
    summary: 'Update team',
    description: 'Update team',
  })
  @ApiOkResponse({
    description: 'Successfully updated team',
    type: TeamResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Patch('/:teamId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: ProtectReqType,
    @Param('teamId', new JoiPipe(Joi.string().uuid().required()))
    teamId: string,
    @Body(JoiPipe) body: TeamUpdateDto,
    @Lang() lang: Language,
  ): Promise<Team> {
    return this.teamRoomService.updateTeamById(req.user, teamId, body, lang);
  }

  @ApiOperation({
    summary: 'Delete team by id',
    description: 'Delete team by id',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted team',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Delete('/:teamId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(
    @Req() req: ProtectReqType,
    @Param('teamId', new JoiPipe(Joi.string().uuid().required()))
    teamId: string,
    @Lang() lang: Language,
  ): Promise<void> {
    return this.teamRoomService.deleteTeamById(req.user, teamId, lang);
  }
}
