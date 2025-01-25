import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User, UserDevice } from '@prisma/client';
import { JoiPipe } from 'nestjs-joi';
import { Request, Response } from 'express';
import * as process from 'process';

import { AuthService } from './auth.service';
import { AuthorizationResponseType } from './swagger/authorization.response';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ProtectReqType } from '../../common/type/request.type';
import { ResponseErrorEnum } from '../../common/enum/response-message.enum';
import { RefreshTokenResponse } from './swagger/refresh-token.response';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  private readonly COOKIES_EXPIRE: number;
  constructor(private readonly authService: AuthService) {
    this.COOKIES_EXPIRE = Number(process.env.COOKIES_EXPIRE) || 86400000;
  }

  @ApiOperation({ summary: 'Register user', description: 'Registration user' })
  @ApiCreatedResponse({
    description: 'Successfully registered',
    type: AuthorizationResponseType,
  })
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.REGISTER_USER_EXIST,
  })
  @Post('/register')
  @HttpCode(201)
  async register(
    @Body(JoiPipe) body: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip: string = String(
      req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown',
    );
    const userAgent = req['useragent'];
    const result = await this.authService.singUpCredentials(
      body,
      userAgent,
      ip,
    );
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete result.refreshToken;
    res.json(result);
  }

  @ApiOperation({ summary: 'Login user', description: 'Login user to app' })
  @ApiOkResponse({
    description: 'Successfully login',
    type: AuthorizationResponseType,
  })
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.LOGIN_UNAUTHORIZED,
  })
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body(JoiPipe) body: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip: string = String(
      req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown',
    );
    const userAgent = req['useragent'];
    const result = await this.authService.singInCredentials(
      body,
      userAgent,
      ip,
    );
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete result.refreshToken;
    res.json(result);
  }

  @ApiOperation({ summary: 'Logout user', description: 'Logout user from app' })
  @ApiNoContentResponse({ description: 'Successfully logout' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({ description: ResponseErrorEnum.USER_BLOCKED })
  @Get('/logout')
  @HttpCode(204)
  async logout(
    @Req() req: ProtectReqType & { device: UserDevice },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.device);
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    res.json();
  }

  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Refresh access and refresh tokens',
  })
  @ApiOkResponse({
    description: 'Successfully refreshing',
    type: RefreshTokenResponse,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: ResponseErrorEnum.TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({ description: ResponseErrorEnum.USER_BLOCKED })
  @Get('/refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: ProtectReqType & { device: UserDevice },
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip: string = String(
      req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown',
    );
    const userAgent = req['useragent'];
    const tokens = await this.authService.refreshToken(
      req.user as User,
      req.device,
      userAgent,
      ip,
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete tokens.refreshToken;
    res.json(tokens);
  }
}
