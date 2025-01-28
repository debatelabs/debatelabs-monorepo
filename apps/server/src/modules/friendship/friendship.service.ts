import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async requestAdd() {}

  async accept() {}
}
