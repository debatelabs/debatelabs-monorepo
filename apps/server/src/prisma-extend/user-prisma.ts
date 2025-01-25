import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserPrisma {
  constructor(private readonly prisma: PrismaService) {}
}
