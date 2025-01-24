import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDto {
  @ApiProperty({ required: true, example: 'mail@example.com' })
  @JoiSchema(
    Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'The email is incorrect',
        'string.empty': 'The email is empty.',
      }),
  )
  email: string;

  @JoiSchema(
    Joi.string().min(1).required().messages({
      'string.empty': 'The password is empty.',
      'string.min': 'The password cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: true, example: 'Password123#' })
  password: string;
}
