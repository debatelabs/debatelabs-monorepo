import { z } from 'zod';

const SessionPayloadSchema = z.object({
  id: z.number(),
  name: z.string()
});

export type SessionPayloadSchemaType = z.infer<typeof SessionPayloadSchema>;

export default SessionPayloadSchema;
