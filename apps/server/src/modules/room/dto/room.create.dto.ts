import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class RoomCreateDto {
  @JoiSchema(Joi.string().min(1).max(500).required())
  @ApiProperty({ required: true, example: 'Why is it ... ?' })
  topic: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(RoomType))
      .required(),
  )
  @ApiProperty({ required: true, example: Object.values(RoomType).join(', ') })
  type: RoomType;

  @JoiSchema(Joi.number().min(2).max(8).multiple(2).required())
  @ApiProperty({ required: true, example: 4 })
  teamCount: number;

  @JoiSchema(Joi.number().min(1).max(4).required())
  @ApiProperty({ required: true, example: 2 })
  membersCount: number;

  @JoiSchema(Joi.date().timestamp().required())
  @ApiProperty({ required: true, example: 1742477528 })
  startAt: Date;
}
