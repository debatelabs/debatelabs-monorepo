import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDto {
  @JoiSchema(
    Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  )
  @ApiProperty({ required: true, example: 'mail@example.com' })
  email: string;

  @JoiSchema(Joi.string().min(1).required())
  @ApiProperty({ required: true, example: 'Password123#' })
  password: string;
}
