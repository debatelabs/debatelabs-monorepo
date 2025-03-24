import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { AuthErrorMessage } from '../../common/messages/error/auth.message';
import { ProfileResponse } from './swagger/profile.response';
import { ProtectReqType } from '../../common/type/request.type';
import { UserUpdateDto } from './dto/user.update.dto';
import { AvatarResponse } from './swagger/avatar.response';
import { ImageValidatorPipe } from '../../common/pipe/validator-image.pipe';
import { Lang } from '../../common/decorator/lang.decorator';
import { Language } from '../../common/enum/language.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get profile of current user',
  })
  @ApiOkResponse({
    description: 'Successfully get profile',
    type: ProfileResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: ProtectReqType, @Lang() lang: Language) {
    return this.userService.getProfile(req.user, lang);
  }

  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update profile of current user',
  })
  @ApiOkResponse({
    description: 'Successfully update profile',
    type: ProfileResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Patch('/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: ProtectReqType,
    @Body(JoiPipe) body: UserUpdateDto,
  ) {
    return this.userService.updateProfile(req.user, body);
  }

  @ApiOperation({
    summary: 'Set user avatar',
    description: 'Set new avatar of current user',
  })
  @ApiOkResponse({
    description: 'Successfully set avatar',
    type: AvatarResponse,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar file',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'File',
        },
      },
    },
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  @Post('/avatar')
  @HttpCode(HttpStatus.OK)
  async setAvatar(
    @Req() req: ProtectReqType,
    @UploadedFiles(
      new ImageValidatorPipe({
        nullable: false,
        maxSize: 10,
        allowFormat: ['png', 'jpg', 'jpeg', 'webp'],
      }),
    )
    files: {
      avatar?: Array<Express.Multer.File>;
    },
    @Lang() lang: Language,
  ) {
    return this.userService.setAvatar(req.user, files?.avatar[0], lang);
  }

  @ApiOperation({
    summary: 'Delete user avatar',
    description: 'Delete avatar of current user',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted avatar',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Delete('/avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAvatar(@Req() req: ProtectReqType, @Lang() lang: Language) {
    return this.userService.deleteAvatar(req.user, lang);
  }
}
