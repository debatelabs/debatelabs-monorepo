import { SessionPayloadDTO } from '~/shared/types/session.types';
import { SessionPayloadSchemaType } from '~/infrastructure/validations/session-payload.schema';

const sessionMapper = {
  toPayloadDTO(data: SessionPayloadSchemaType): SessionPayloadDTO {
    return {
      id: data.id,
      name: data.name
    };
  }
};

export default sessionMapper;
