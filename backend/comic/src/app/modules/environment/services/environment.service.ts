import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVars } from "../../../config/enums";

@Injectable()
export class EnvironmentService {
  @Inject() private readonly config: ConfigService;

  get IMAGE_FOLDER(): string {
    return this.config.get(EnvironmentVars.IMAGE_FOLDER)!;
  }

  get MONGO_URL(): string {
    return this.config.get(EnvironmentVars.MONGO_URL)!;
  }
}
