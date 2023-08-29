import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Environment } from "../enums";

@Injectable()
export class EnvitonmentService {
  @Inject() private readonly config: ConfigService;

  get IMAGE_FOLDER(): string {
    return this.config.get(Environment.IMAGE_FOLDER);
  }
}
