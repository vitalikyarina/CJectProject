import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { ComicControllerName } from "../../enums";
import {
  ComicClientProxy,
  ComicCreateWithResourcesDTO,
  ComicModel,
  ComicUpdateDTO,
} from "@cjp-back/comic";

@ApiTags(ComicControllerName.COMICS)
@Controller(ComicControllerName.COMICS)
export class ComicController {
  constructor(private readonly client: ComicClientProxy) {}

  @ApiOkResponse({
    type: ComicModel,
    isArray: true,
  })
  @Get("")
  getAllComics(): Observable<ComicModel[]> {
    return this.client.getAllComics();
  }

  @ApiOkResponse({
    type: ComicModel,
  })
  @Post("")
  createComic(
    @Body() createData: ComicCreateWithResourcesDTO,
  ): Observable<ComicModel> {
    return this.client.createComic(createData);
  }

  // @ApiOkResponse({
  //   type: ComicModel,
  // })
  // @Patch(":id")
  // updateEntity(
  //   @Param("id") id: string,
  //   @Body() updateData: ComicUpdateDTO,
  // ): Observable<ComicModel> {
  //   return this.comicService.updateOneById(id, updateData);
  // }
}
