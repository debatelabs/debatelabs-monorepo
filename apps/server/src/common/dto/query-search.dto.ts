import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
  convert: true,
})
export class QuerySearchDto {
  @JoiSchema(
    Joi.array().items(Joi.number().integer()).length(2).default([1, 15]),
  )
  range?: [number, number];

  @JoiSchema(
    Joi.array()
      .items(Joi.string().max(20), Joi.valid('asc', 'desc'))
      .length(2)
      .default(['id', 'desc']),
  )
  sort?: [string, 'asc' | 'desc'];

  @JoiSchema(Joi.object().default({}))
  filter?: {
    [key: string]: any;
  };
}
