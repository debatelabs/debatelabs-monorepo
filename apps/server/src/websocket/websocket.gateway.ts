import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as process from 'process';
import { Logger } from '@nestjs/common';

import { AuthWsDto } from './dto/auth-ws.dto';
import { WebsocketAuthService } from './websocket-auth.service';
import { RedisKey } from '../common/enum/redis-key.enum';

const PORT_WS = Number(process.env.PORT_WEBSOCKET);

@WebSocketGateway(PORT_WS, {
  cors: true,
  namespace: '/',
  path: '/api/socket',
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketGateway.name);

  constructor(
    @InjectRedis()
    private readonly redisClient: Redis,
    private readonly websocketAuthService: WebsocketAuthService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const socketId = client.id;
    const userId = await this.redisClient.get(
      `${RedisKey.CONNECTIONS_SOCKET}:${socketId}:user`,
    );

    if (userId) {
      await this.redisClient.srem(
        `${RedisKey.CONNECTIONS_USER}:${userId}:sockets`,
        socketId,
      );
    }
    await this.redisClient.del(
      `${RedisKey.CONNECTIONS_SOCKET}:${socketId}:user`,
    );
    this.logger.log(`Client disconnected ${client.id}, user: ${userId}`);
  }

  @SubscribeMessage('auth')
  async authenticate(
    @MessageBody() { token }: AuthWsDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = await this.websocketAuthService.authConnect(token);
    await Promise.all([
      this.redisClient.sadd(
        `${RedisKey.CONNECTIONS_USER}:${userId}:sockets`,
        client.id,
      ),
      // this.redisClient.smembers(`${RedisKey.CONNECTIONS_USER}:${userId}:sockets`)
      this.redisClient.set(
        `${RedisKey.CONNECTIONS_SOCKET}:${client.id}:user`,
        userId,
      ),
    ]);
    this.logger.log(`Client authenticated: ${client.id}, user: ${userId}`);

    client.emit('auth', { status: 200, message: 'Connected' });
  }
}
