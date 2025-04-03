import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class TeamCreateDto {
  @JoiSchema(Joi.string().min(1).max(100).required())
  @ApiProperty({ required: true, example: 'Team 1' })
  name: string;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class TeamUpdateDto {
  @JoiSchema(Joi.string().min(1).max(100).required())
  @ApiProperty({ required: true, example: 'Team 1' })
  name: string;
}
