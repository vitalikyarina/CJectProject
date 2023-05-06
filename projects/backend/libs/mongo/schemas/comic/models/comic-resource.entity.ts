import { IComicResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ComicSiteEntity } from "./comic-site.entity";
import { IsNotEmpty } from "class-validator";

export class ComicResourceEntity implements IComicResource {
  @ApiProperty({ nullable: false })
  public _id: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public link: string;

  @ApiProperty({ nullable: false, type: String })
  @IsNotEmpty()
  public type: ResourceType;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public priority: number;

  @ApiProperty({ nullable: false })
  public siteData: ComicSiteEntity;

  @ApiProperty({ nullable: true })
  public errorType: ResourceError | undefined | null;
}

export class ComicResourceCreateDTO extends OmitType(ComicResourceEntity, [
  "_id",
  "siteData",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public siteData: string;
}

export class ComicResourceUpdateDTO extends PartialType(
  ComicResourceCreateDTO,
) {}
