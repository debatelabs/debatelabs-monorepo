import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class RegisterDto {
  @ApiProperty({ required: true, example: 'mail@example.com' })
  @JoiSchema(
    Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  )
  email: string;

  @JoiSchema(Joi.string().min(1).max(100).required())
  @ApiProperty({ required: true, example: 'Jon' })
  name: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^[A-Za-z0-9!@#$%^&*()+={}[\]:;"'<>,.?/\\|`~\-_]*$/)
      .pattern(/[A-Z]/)
      .pattern(/[0-9]/)
      .pattern(/[\W_]/)
      .min(8)
      .max(100)
      .required(),
  )
  @ApiProperty({ required: true, example: 'Password123#' })
  password: string;
}
