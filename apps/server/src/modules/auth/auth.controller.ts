import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTemporaryRedirectResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Language, User, UserDevice } from '@prisma/client';
import { JoiPipe } from 'nestjs-joi';
import { Request, Response } from 'express';
import * as process from 'process';

import { AuthService } from './auth.service';
import { AuthorizationResponseType } from './swagger/authorization.response';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ProtectReqType } from '../../common/type/request.type';
import { RefreshTokenResponse } from './swagger/refresh-token.response';
import { AuthErrorMessage } from '../../common/messages/error/auth.message';
import AuthGoogle from '../../common/guard/google.guard';

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
    description: AuthErrorMessage[Language.EN].REGISTER_USER_EXIST,
  })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
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
    res.cookie('accessToken', result.accessToken, {
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
    description: AuthErrorMessage[Language.EN].LOGIN_UNAUTHORIZED,
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
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
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete result.refreshToken;
    res.json(result);
  }

  @ApiOperation({
    summary: 'Login user with Google',
    description: 'Start user authorization',
  })
  @ApiOkResponse({
    description: 'Successfully login with Google.',
  })
  @Get('google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGoogle)
  googleLogin() {
    return;
  }

  @ApiOperation({
    summary: 'Auth for Google. Automatically! Not use!',
    description: 'Continue user authorized and Redirect',
  })
  @ApiTemporaryRedirectResponse({
    description: `Redirect to ${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}`,
  })
  @Get('google/callback')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @UseGuards(AuthGoogle)
  async googleLoginCallback(
    @Req()
    req: Request & {
      user: Pick<User, 'firstName' | 'lastName' | 'avatar' | 'email'>;
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip: string = String(
      req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown',
    );
    const userAgent = req['useragent'];
    const foundUser = await this.authService.authGoogle(
      req.user,
      userAgent,
      ip,
    );

    res.cookie('refreshToken', foundUser.refreshToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    res.cookie('accessToken', foundUser.accessToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    res.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}`,
    );
  }

  @ApiOperation({ summary: 'Logout user', description: 'Logout user from app' })
  @ApiNoContentResponse({ description: 'Successfully logout' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
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
    description: AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
  })
  @ApiForbiddenResponse({
    description: AuthErrorMessage[Language.EN].USER_BLOCKED,
  })
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
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
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      maxAge: this.COOKIES_EXPIRE,
    });
    delete tokens.refreshToken;
    res.json(tokens);
  }
}
