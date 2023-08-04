import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { ComicControllerName } from "../enums";
import {
  Comic,
  ComicClientProxy,
  ComicCreateWithResourcesDTO,
  ComicUpdateDTO,
} from "@cjp-back/comic";
import { MongooseClassSerializerInterceptor } from "@cjp-back/mongo";

@ApiTags(ComicControllerName.COMICS)
@Controller(ComicControllerName.COMICS)
@UseInterceptors(MongooseClassSerializerInterceptor(Comic))
export class ComicController {
  constructor(private readonly client: ComicClientProxy) {}

  @ApiOkResponse({
    type: Comic,
    isArray: true,
  })
  @Get("")
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async getAllComics(): Promise<Comic[]> {
    // const comics = (await this.client.getAllComics()).map(
    //   (comic) => new Comic(comic),
    // );
    return this.client.getAllComics();
  }

  @ApiOkResponse({
    type: Comic,
  })
  @Post("")
  createComic(
    @Body() createData: ComicCreateWithResourcesDTO,
  ): Observable<Comic> {
    return this.client.createComic(createData);
  }

  @ApiOkResponse({
    type: Comic,
  })
  @Patch(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateEntity(
    @Param("id") id: string,
    @Body() updateData: ComicUpdateDTO,
  ): Promise<Comic> {
    //const comic = await this.client.updateComic(id, updateData);
    return this.client.updateComic(id, updateData);
  }
}
