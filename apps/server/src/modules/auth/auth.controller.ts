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
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDevice } from '@prisma/client';
import { JoiPipe } from 'nestjs-joi';
import { Request, Response } from 'express';
import * as process from 'process';

import { AuthService } from './auth.service';
import { AuthorizationResponseType } from './swagger/authorization.response';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ProtectReqType } from '../../common/type/request.type';

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
    description: 'User already registered',
  })
  @Post('/register')
  @HttpCode(201)
  async register(
    @Body(JoiPipe) body: RegisterDto,
    @Req() req: Request,
    @Res() res: Response,
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
    description: 'Username or password is wrong',
  })
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body(JoiPipe) body: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
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
    description: 'User not authorized or session expired',
  })
  @Get('/logout')
  @HttpCode(204)
  async logout(@Req() req: ProtectReqType & { device: UserDevice }) {
    return this.authService.logout(req.device);
  }
}
