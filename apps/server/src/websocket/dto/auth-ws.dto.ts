import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class AuthWsDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty({ required: true, example: 'secret_string' })
  token: string;
}
