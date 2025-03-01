import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Language } from '@prisma/client';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginDto {
  @JoiSchema(
    Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'The email is incorrect',
        'string.empty': 'The email is empty.',
      }),
  )
  @ApiProperty({ required: true, example: 'mail@example.com' })
  email: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(Language))
      .default(Language.EN),
  )
  @ApiProperty({ required: false, example: Language.UK })
  language?: Language;

  @JoiSchema(
    Joi.string().min(1).required().messages({
      'string.empty': 'The password is empty.',
      'string.min': 'The password cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: true, example: 'Password123#' })
  password: string;
}
