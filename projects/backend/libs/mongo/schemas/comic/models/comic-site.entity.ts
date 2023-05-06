import { ISite } from "@cjp/shared/comic";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SiteEntity implements ISite {
  @ApiProperty({ nullable: false })
  public _id: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public mainImagePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chaptersPath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapterNamePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapterDatePath: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public chapterImagesPath: string;

  @ApiProperty({ required: false })
  public chapterLazyLoadPath: string | undefined | null;

  @ApiProperty({ required: false })
  public browserType: string | undefined | null;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public baseLink: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public dateFormat: string;

  constructor(partial: Partial<SiteEntity>) {
    Object.assign(this, partial);
  }
}

export class SiteCreateDTO extends OmitType(SiteEntity, ["_id"]) {}

export class SiteUpdateDTO extends PartialType(SiteCreateDTO) {}
