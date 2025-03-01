import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as process from 'process';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import {
  ensureDir,
  pathExistsSync,
  removeSync,
  unlink,
  writeFile,
} from 'fs-extra';
import { join } from 'path';

import { FileSaveType } from '../../common/type/file-save.type';
import { PrismaService } from '../../prisma.service';
import { AvailableFormatInfo, FormatEnum } from 'sharp';

type OptionImageType = {
  width: number;
  height: number;
  fit?: 'inside' | 'outside' | 'cover' | 'contain';
};

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  private async generatePathFile({
    file,
    filePath,
    format,
  }: {
    file: Express.Multer.File;
    filePath: string[];
    format?: string;
  }) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const fileName = file.originalname;
    const fileKey = uuidv4();
    const splitFileName = fileName.split('.');
    const extname = splitFileName.pop();

    const fullFolderPath = path.join(process.cwd(), ...filePath);
    await ensureDir(fullFolderPath);

    const fileUniqueName = `${fileKey}-${splitFileName.join('.')}.${format || extname}`;
    const fullFilePath = path.join(fullFolderPath, fileUniqueName);
    const dbFilePath = path.join('api', ...filePath, fileUniqueName);
    return {
      fileName,
      fileKey,
      fullFilePath,
      dbFilePath,
    };
  }

  async saveImage({
    format,
    filePath,
    file,
    option,
  }: {
    file: Express.Multer.File;
    filePath: string[];
    format?: keyof FormatEnum | AvailableFormatInfo;
    option?: OptionImageType;
  }): Promise<FileSaveType | null> {
    try {
      const { fullFilePath, dbFilePath, fileName, fileKey } =
        await this.generatePathFile({
          file,
          filePath,
          format: format as string,
        });

      const sharpAction = sharp(file.buffer);
      if (option) sharpAction.resize(option);
      if (format) sharpAction.toFormat(format);
      await sharpAction.webp({ quality: 85 }).toFile(fullFilePath);

      return {
        name: fileName,
        path: dbFilePath,
        key: fileKey,
      };
    } catch (e) {
      this.prisma.logError.create({
        data: {
          status: 500,
          title: 'save file',
          message: e,
        },
      });
      return null;
    }
  }

  async saveFile(
    file: Express.Multer.File,
    ...filePath: string[]
  ): Promise<FileSaveType | null> {
    try {
      const { fullFilePath, dbFilePath, fileName, fileKey } =
        await this.generatePathFile({
          file,
          filePath,
        });
      await writeFile(fullFilePath, file.buffer);

      return {
        name: fileName,
        path: dbFilePath,
        key: fileKey,
      };
    } catch (e) {
      this.prisma.logError.create({
        data: {
          status: 500,
          title: 'save file',
          message: e,
        },
      });
      return null;
    }
  }

  async saveFileMany(
    files: Array<Express.Multer.File>,
    ...filePath: string[]
  ): Promise<Array<FileSaveType | null>> {
    return Promise.all(files.map((item) => this.saveFile(item, ...filePath)));
  }

  async deleteFiles(filePaths: string[]): Promise<boolean> {
    try {
      filePaths.forEach((filePath: string) => {
        const fullPath = join(process.cwd(), filePath.replace('api/', ''));

        const isExistFile = pathExistsSync(fullPath);
        if (isExistFile) {
          unlink(fullPath);
        }
      });
      return true;
    } catch (err) {
      this.prisma.logError.create({
        data: {
          status: 500,
          title: 'delete files',
          message: err,
        },
      });
      return false;
    }
  }

  async deleteFolders(folderPaths: string[]): Promise<boolean> {
    try {
      await Promise.all(
        folderPaths.map((folderPath: string) =>
          removeSync(join(process.cwd(), folderPath)),
        ),
      );
      return true;
    } catch (e) {
      this.prisma.logError.create({
        data: {
          status: 500,
          title: 'delete folders',
          message: e,
        },
      });
      return false;
    }
  }
}
