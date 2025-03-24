import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { TUserAuth } from '../../common/type/user.type';
import { CustomExceptionUtil } from '../../utils/custom-exception.util';
import { UserErrorMessage } from '../../common/messages/error/user.message';
import { UserUpdateDto } from './dto/user.update.dto';
import { FileService } from '../../utils/file/file.service';
import { Language } from '../../common/enum/language.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async getProfile(user: TUserAuth, lang: Language) {
    const profile = this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        email: true,
        name: true,
        avatar: true,
        birthday: true,
        gender: true,
      },
    });
    if (!profile)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        UserErrorMessage[lang].USER_NOT_FOUND,
      );
    return profile;
  }

  async updateProfile(user: TUserAuth, body: UserUpdateDto) {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: body,
      select: {
        email: true,
        name: true,
        birthday: true,
        gender: true,
      },
    });
  }

  async setAvatar(
    user: TUserAuth,
    avatar: Express.Multer.File,
    lang: Language,
  ): Promise<{ url: string }> {
    const profile = await this.prisma.user.findFirst({
      where: { id: user.id },
      select: { avatar: true },
    });
    if (!profile)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        UserErrorMessage[lang].USER_NOT_FOUND,
      );
    const savedAvatar = await this.fileService.saveImage({
      file: avatar,
      filePath: ['static', 'user', `${user.id}`],
      option: {
        width: 500,
        height: 500,
        fit: 'cover',
      },
      format: 'webp',
    });
    if (!savedAvatar)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        UserErrorMessage[lang].AVATAR_SET,
      );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: savedAvatar.path,
      },
    });
    if (profile.avatar) await this.fileService.deleteFiles([profile.avatar]);

    return { url: savedAvatar.path };
  }

  async deleteAvatar(user: TUserAuth, lang: Language): Promise<void> {
    const profile = await this.prisma.user.findFirst({
      where: { id: user.id },
      select: { avatar: true },
    });
    if (!profile)
      throw new CustomExceptionUtil(
        HttpStatus.NOT_FOUND,
        UserErrorMessage[lang].USER_NOT_FOUND,
      );

    if (profile.avatar) {
      await this.fileService.deleteFiles([profile.avatar]);
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: null,
        },
      });
    }

    return;
  }
}
