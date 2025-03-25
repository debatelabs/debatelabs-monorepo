import { SessionPayloadDTO } from '~/shared/types/session.types';
import { SessionPayloadSchemaType } from '~/infrastructure/validations/session-payload.schema';

class SessionMapper {
  toPayloadDTO(data: SessionPayloadSchemaType): SessionPayloadDTO {
    return {
      id: data.id,
      name: data.name
    };
  }
}

export default SessionMapper;
