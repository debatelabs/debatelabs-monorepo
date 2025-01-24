import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { Request, Response } from 'express';
import * as process from 'process';

import { AuthService } from './auth.service';
import { RegisterResponseType } from './swagger/register.response';
import { RegisterDto } from './dto/register.dto';

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
    type: RegisterResponseType,
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
    console.log('COOKIES_EXPIRE', this.COOKIES_EXPIRE);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete result.refreshToken;
    res.json(result);
  }
}
