import { ChapterError, IChapter } from "@cjp/shared/comic";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ResourceModel } from "./comic-resource.model";

export class ChapterModel implements IChapter {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public number!: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public link!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public countPage!: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public isLoaded!: boolean;

  @ApiProperty({ nullable: false })
  @Expose()
  public get isError(): boolean {
    if (this.errorPages) {
      return true;
    }
    return false;
  }

  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  public errorPages!: Record<number, boolean>;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public date!: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: ResourceModel;

  @ApiProperty({ nullable: true, type: Number })
  @IsNotEmpty()
  public errorType!: ChapterError;

  @ApiProperty({ nullable: false })
  public images!: string[];
}

export class ChapterCreateDTO extends PickType(ChapterModel, [
  "number",
  "link",
  "date",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: string;
}
export class ChapterWithResourceCreateDTO extends PickType(ChapterModel, [
  "number",
  "link",
  "date",
  "resource",
]) {}

class ChapterUpdate extends PickType(ChapterModel, [
  "link",
  "date",
  "countPage",
  "isLoaded",
  "errorType",
  "errorPages",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: string;
}

export class ChapterUpdateDTO extends PartialType(ChapterUpdate) {}
