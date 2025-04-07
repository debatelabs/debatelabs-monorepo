import { z } from 'zod';

const SessionPayloadSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
  deviceId: z.number(),
  iat: z.number(),
  exp: z.number()
});

export type SessionPayloadDTO = z.infer<typeof SessionPayloadSchema>;

export default SessionPayloadSchema;
