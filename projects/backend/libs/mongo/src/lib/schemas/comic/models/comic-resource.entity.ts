import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { SiteEntity } from "./comic-site.entity";
import { IsNotEmpty } from "class-validator";

export class ResourceEntity implements IResource {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public link!: string;

  @ApiProperty({ nullable: false, type: Number })
  @IsNotEmpty()
  public type!: ResourceType;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public priority!: number;

  @ApiProperty({ nullable: false })
  public siteData!: SiteEntity;

  @ApiProperty({ nullable: true, type: Number })
  public errorType: ResourceError | undefined | null;
}

export class ResourceCreateDTO extends OmitType(ResourceEntity, [
  "_id",
  "siteData",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public siteData!: string;
}

export class ResourceUpdateDTO extends PartialType(ResourceCreateDTO) {}
