import { ChapterError, IChapter } from "@cjp/shared/comic";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ResourceEntity } from "./comic-resource.entity";
import { IsNotEmpty } from "class-validator";

export class ChapterEntity implements IChapter {
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
  public resource!: ResourceEntity;

  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  public errorType!: ChapterError;

  @ApiProperty({ nullable: false })
  public images!: string[];
}

export class ChapterCreateDTO extends PickType(ChapterEntity, [
  "number",
  "link",
  "date",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resource!: string;
}
export class ChapterWithResourceCreateDTO extends PickType(ChapterEntity, [
  "number",
  "link",
  "date",
  "resource",
]) {}

class ChapterUpdate extends PickType(ChapterEntity, [
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
