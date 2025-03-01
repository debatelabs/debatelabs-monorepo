import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { Language } from '@prisma/client';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserUpdateDto {
  @JoiSchema(
    Joi.string().min(1).max(100).messages({
      'string.empty': 'The name is empty.',
      'string.max': 'The name cannot be more than 100 characters',
      'string.min': 'The name cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: false, example: 'Jon' })
  firstName?: string;

  @JoiSchema(
    Joi.string().min(1).max(100).allow(null).messages({
      'string.empty': 'The name is empty.',
      'string.max': 'The name cannot be more than 100 characters',
      'string.min': 'The name cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: false, example: 'Smith', nullable: true })
  lastName?: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(Language))
      .default(Language.EN),
  )
  @ApiProperty({ required: false, example: Language.UK })
  language?: Language;

  @JoiSchema(Joi.boolean())
  @ApiProperty({ required: false, example: true })
  gender?: boolean;

  @JoiSchema(Joi.date())
  @ApiProperty({ required: false, example: '05.06.2000', nullable: true })
  birthday?: Date;
}
