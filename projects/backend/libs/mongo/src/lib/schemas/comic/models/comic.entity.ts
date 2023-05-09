import { ComicStatus, ComicTag, IComic } from "@cjp/shared/comic";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { ResourceCreateDTO, ResourceEntity } from "./comic-resource.entity";
import { ChapterEntity } from "./comic-chapter.entity";
import { IsNotEmpty } from "class-validator";

export class ComicEntity implements IComic {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public altNames!: string[];

  @ApiProperty({ nullable: false })
  public resources!: ResourceEntity[];

  @ApiProperty({ nullable: false })
  public chapters!: ChapterEntity[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public latestUpdate!: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public tags!: ComicTag[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public status!: ComicStatus;

  @ApiProperty({ nullable: false })
  public mainImages!: string[];
}

export class ComicCreateDTO extends PickType(ComicEntity, [
  "name",
  "altNames",
]) {
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

export class ComicCreateWithResourcesDTO extends PickType(ComicEntity, [
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

class ComicUpdate extends PickType(ComicEntity, [
  "name",
  "altNames",
  "latestUpdate",
  "tags",
  "status",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public resources!: string[];

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapters!: string[];
}

export class ComicUpdateDTO extends PartialType(ComicUpdate) {}
