import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Environment } from "../../../core";

@Injectable()
export class EnvironmentService {
  @Inject() private readonly config: ConfigService;

  get IMAGE_FOLDER(): string {
    return this.config.get(Environment.IMAGE_FOLDER);
  }
}
