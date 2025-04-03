import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Param,
  Query,
  Delete,
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
import { Room } from '@prisma/client';
import * as Joi from 'joi';

import { RoomService } from '../services/room.service';
import { AuthErrorMessage } from '../../../common/messages/error/auth.message';
import { ProtectReqType } from '../../../common/type/request.type';
import { RoomCreateDto } from '../dto/room.create.dto';
import { RoomResponse } from '../swagger/room.response';
import { RoomUpdateDto } from '../dto/room.update.dto';
import { Lang } from '../../../common/decorator/lang.decorator';
import { Language } from '../../../common/enum/language.enum';
import { OneRoomResponse, RoomsResponse } from '../swagger/rooms.response';
import { QuerySearchDto } from '../../../common/dto/query-search.dto';

@ApiTags('Room')
@Controller('room')
export class CrudRoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({
    summary: 'Create room',
    description: 'Create new room for debate',
  })
  @ApiOkResponse({
    description: 'Successfully created room',
    type: OneRoomResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req: ProtectReqType,
    @Body(JoiPipe) body: RoomCreateDto,
  ): Promise<Room> {
    return this.roomService.create(req.user, body);
  }

  @ApiOperation({
    summary: 'Get room by id',
    description: 'Get info of room by id',
  })
  @ApiOkResponse({
    description: 'Successfully got room',
    type: RoomResponse,
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
  async getById(
    @Req() req: ProtectReqType,
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
    @Lang() lang: Language,
  ): Promise<Room> {
    return this.roomService.getById(req.user, roomId, lang);
  }

  @ApiOperation({
    summary: 'Get many rooms',
    description: 'Get many rooms',
  })
  @ApiOkResponse({
    description: 'Successfully got rooms',
    type: RoomsResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getMany(
    @Req() req: ProtectReqType,
    @Query(JoiPipe)
    query: QuerySearchDto,
    @Lang() lang: Language,
  ): Promise<RoomsResponse> {
    return this.roomService.getAll(req.user, query, lang);
  }

  @ApiOperation({
    summary: 'Update room',
    description: 'Setting room for debate',
  })
  @ApiOkResponse({
    description: 'Successfully updated room',
    type: OneRoomResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Patch('/:roomId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: ProtectReqType,
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
    @Body(JoiPipe) body: RoomUpdateDto,
    @Lang() lang: Language,
  ): Promise<Room> {
    return this.roomService.update(req.user, roomId, body, lang);
  }

  @ApiOperation({
    summary: 'Delete room by id',
    description: 'Delete room by id',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted room',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Delete('/:roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(
    @Req() req: ProtectReqType,
    @Param('roomId', new JoiPipe(Joi.string().uuid().required()))
    roomId: string,
    @Lang() lang: Language,
  ): Promise<void> {
    return this.roomService.deleteById(req.user, roomId, lang);
  }
}
