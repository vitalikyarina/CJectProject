import { IResource, ResourceError, ResourceType } from "@cjp/shared/comic";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { SiteModel } from "./comic-site.model";
import { IsNotEmpty } from "class-validator";

export class ResourceModel implements IResource {
  @ApiProperty({ nullable: false })
  public _id!: string;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public path!: string;

  @ApiProperty({ nullable: false, type: Number })
  @IsNotEmpty()
  public type!: ResourceType;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public priority!: number;

  @ApiProperty({ nullable: false })
  public siteData!: SiteModel;

  @ApiProperty({ nullable: true, type: Number })
  public errorType: ResourceError | undefined | null;
}

export class ResourceCreateDTO extends OmitType(ResourceModel, [
  "_id",
  "siteData",
]) {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  public siteData!: string;

  public _id!: string | undefined;
}

export class ResourceUpdateDTO extends PartialType(ResourceCreateDTO) {}
