import { Module } from "@nestjs/common";
import { FSHelperService } from "./services";

@Module({
  providers: [FSHelperService],
  exports: [FSHelperService],
})
export class SharedModule {}
