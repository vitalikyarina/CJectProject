import { Injectable } from "@nestjs/common";
import { ChapterAPI } from "../apis";
import { BaseMongoService } from "@cjp-back/mongo";
import { Chapter, ChapterCreateDTO, ChapterUpdateDTO } from "../schemas";
@Injectable()
export class ChapterService extends BaseMongoService<
  Chapter,
  ChapterCreateDTO,
  ChapterUpdateDTO
> {
  constructor(private readonly api: ChapterAPI) {
    super(api);
  }

  async deleteChaptersByResourceId(id: string): Promise<Chapter[]> {
    const deletedChapters = [];
    const chapters = await this.find({ resource: id });
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];

      await this.deleteOneById(chapter._id);
      deletedChapters.push(chapter);
    }

    return deletedChapters;
  }
}
