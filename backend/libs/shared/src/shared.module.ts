import { Module } from "@nestjs/common";
import { FSService } from "./services";

@Module({
  providers: [FSService],
  exports: [FSService],
})
export class SharedModule {}
