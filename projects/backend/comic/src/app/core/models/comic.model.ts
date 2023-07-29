import { ComicStatus, ComicTag, IComic } from "@cjp/shared/comic";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ResourceCreateDTO, ResourceModel } from "./comic-resource.model";
import { ChapterModel } from "./comic-chapter.model";

export class ComicModel implements IComic {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public altNames!: string[];

  @ApiProperty({ nullable: false })
  public resources!: ResourceModel[];

  @ApiProperty({ nullable: false })
  public chapters!: ChapterModel[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public latestUpdate!: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public tags!: ComicTag[];

  @ApiProperty({ nullable: false, type: Number })
  @IsNotEmpty()
  public status!: ComicStatus;

  @ApiProperty({ nullable: false })
  public postImage!: string;
}

export class ComicCreateDTO extends PickType(ComicModel, ["name", "altNames"]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources: string[];

  constructor(comic: ComicCreateWithResourcesDTO) {
    super();
    this.name = comic.name;
    this.altNames = comic.altNames;
    this.resources = [];
  }
}

export class ComicCreateWithResourcesDTO extends PickType(ComicModel, [
  "name",
  "altNames",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources: ResourceCreateDTO[];

  constructor(comic: ComicCreateDTO) {
    super();
    this.name = comic.name;
    this.altNames = comic.altNames;
    this.resources = [];
  }
}

class ComicUpdate extends PickType(ComicModel, [
  "name",
  "altNames",
  "latestUpdate",
  "tags",
  "status",
  "postImage",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources!: string[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapters!: string[];
}

export class ComicUpdateDTO extends PartialType(ComicUpdate) {}
