import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Language } from '@prisma/client';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class RegisterDto {
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
    Joi.string().min(1).max(100).required().messages({
      'string.empty': 'The name is empty.',
      'string.max': 'The name cannot be more than 100 characters',
      'string.min': 'The name cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: true, example: 'Jon' })
  firstName: string;

  @JoiSchema(
    Joi.string().min(1).max(100).messages({
      'string.empty': 'The name is empty.',
      'string.max': 'The name cannot be more than 100 characters',
      'string.min': 'The name cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: false, example: 'Smith' })
  lastName?: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(Language))
      .default(Language.EN),
  )
  @ApiProperty({ required: false, example: Language.UK })
  language?: Language;

  @JoiSchema(
    Joi.string()
      .pattern(/^[A-Za-z0-9!@#$%^&*()+={}[\]:;"'<>,.?/\\|`~\-_]*$/)
      .pattern(/[A-Z]/)
      .pattern(/[0-9]/)
      .pattern(/[\W_]/)
      .min(8)
      .max(100)
      .required()
      .messages({
        'string.empty': 'The password is empty.',
        'string.pattern.base':
          'Password may including at least one capital letter and one number and one special letter number.',
        'string.max': 'The name cannot be more than 100 characters',
        'string.min': 'The name cannot be less than 8 characters',
      }),
  )
  @ApiProperty({ required: true, example: 'Password123#' })
  password: string;
}
