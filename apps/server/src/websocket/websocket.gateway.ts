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
    console.log('client connected');
    console.log(client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('client disconnected');
    console.log(client.id);
  }

  @SubscribeMessage('auth')
  async authenticate(
    @MessageBody() { token }: AuthWsDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = await this.websocketAuthService.authConnect(token);
    await Promise.all([
      this.redisClient.sadd(`${RedisKey.CONNECTIONS_USER}:sockets`, client.id),
      this.redisClient.set(`${RedisKey.CONNECTIONS_SOCKET}:user`, userId),
    ]);

    client.emit('auth', { status: 'connected' });
  }
}
