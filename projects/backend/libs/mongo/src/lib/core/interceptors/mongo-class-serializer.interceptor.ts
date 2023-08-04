import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from "@nestjs/common";
import { ClassTransformOptions, plainToClass } from "class-transformer";
import { Document } from "mongoose";

export function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(
      document: PlainLiteralObject,
    ): PlainLiteralObject | PlainLiteralObject[] {
      if (!(document instanceof Document)) {
        return plainToClass(classToIntercept, document);
      }

      return plainToClass(classToIntercept, document.toJSON());
    }

    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ): PlainLiteralObject | PlainLiteralObject[] {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    override serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ): PlainLiteralObject | PlainLiteralObject[] {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}
