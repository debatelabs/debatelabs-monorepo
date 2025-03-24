import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserUpdateDto {
  @JoiSchema(
    Joi.string().min(1).max(100).messages({
      'string.empty': 'The first name is empty.',
      'string.max': 'The first name cannot be more than 100 characters',
      'string.min': 'The first name cannot be less than 1 characters',
    }),
  )
  @ApiProperty({ required: false, example: 'Jon' })
  name?: string;

  @JoiSchema(Joi.boolean())
  @ApiProperty({ required: false, example: true })
  gender?: boolean;

  @JoiSchema(Joi.date())
  @ApiProperty({ required: false, example: '05.06.2000', nullable: true })
  birthday?: Date;
}
