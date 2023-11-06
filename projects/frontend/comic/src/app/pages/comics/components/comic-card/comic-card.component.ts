import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResourceType } from "@cjp/comic";
import { RouterLink } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ImageComponent } from "@cjp-front/image";
import { ChapterModel, ComicModel } from "../../../../core";

@Component({
  selector: "cjp-comic-card",
  standalone: true,
  imports: [CommonModule, RouterLink, FlexLayoutModule, ImageComponent],
  templateUrl: "./comic-card.component.html",
  styleUrls: ["./comic-card.component.scss"],
})
export class ComicCardComponent implements OnInit {
  @Input({ required: true }) public comic!: ComicModel;

  public last2chapters: ChapterModel[] = [];

  public ngOnInit(): void {
    this.initLast2Chapters();
  }

  public isRaw(chapter: ChapterModel): boolean {
    return chapter.resource.type === ResourceType.RAW;
  }

  public isLoading(chapter: ChapterModel): boolean {
    return !chapter.isLoaded;
  }

  public isNew(chapter: ChapterModel): boolean {
    const dayBefore = Date.now() - 24 * 60 * 60 * 1000;
    return dayBefore < chapter.date;
  }

  private initLast2Chapters(): void {
    this.last2chapters = this.comic.chapters
      .sort((a, b) => a.date - b.date)
      .slice(this.comic.chapters.length - 2, this.comic.chapters.length)
      .reverse();
  }
}
