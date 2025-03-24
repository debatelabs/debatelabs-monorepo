import { JwtPayloadDTO, TokenPayload } from '~/shared/types/session.types';

class SessionMapper {
  toJwtPayloadDTO(data: TokenPayload): JwtPayloadDTO {
    return {
      id: data.id,
      name: data.name
    };
  }
}

export default SessionMapper;
