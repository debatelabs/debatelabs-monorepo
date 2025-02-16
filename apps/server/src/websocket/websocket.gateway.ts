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

  constructor(
    @InjectRedis()
    private readonly redisClient: Redis,
    private readonly websocketAuthService: WebsocketAuthService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('client connected', client.id);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('client disconnected', client.id);
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
    console.log('client authenticated:', client.id);

    client.emit('auth', { status: 'connected' });
  }
}
