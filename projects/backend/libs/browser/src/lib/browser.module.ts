import { Module } from "@nestjs/common";
import { BrowserHelperService } from "./services";

@Module({
  providers: [BrowserHelperService],
  exports: [BrowserHelperService],
})
export class BrowserModule {}
