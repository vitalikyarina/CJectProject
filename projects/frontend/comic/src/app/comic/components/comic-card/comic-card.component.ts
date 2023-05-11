import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChapterEntity, ComicEntity } from "../../core/models";
import { ResourceType } from "@cjp/shared/comic";
import { RouterLink } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ImageComponent } from "@cjp-front/image";

@Component({
  selector: "cjp-comic-card",
  standalone: true,
  imports: [CommonModule, RouterLink, FlexLayoutModule, ImageComponent],
  templateUrl: "./comic-card.component.html",
  styleUrls: ["./comic-card.component.scss"],
})
export class ComicCardComponent implements OnInit {
  @Input({ required: true }) public comic!: ComicEntity;

  public last2chapters: ChapterEntity[] = [];

  public ngOnInit(): void {
    this.last2chapters = this.comic.chapters
      .slice(this.comic.chapters.length - 2, this.comic.chapters.length)
      .reverse();
  }

  public isRaw(chapter: ChapterEntity): boolean {
    return chapter.resource.type === ResourceType.RAW;
  }

  public isLoading(chapter: ChapterEntity): boolean {
    return !chapter.isLoaded;
  }

  public isNew(chapter: ChapterEntity): boolean {
    const dayBefore = Date.now() - 24 * 60 * 60 * 1000;
    return dayBefore < chapter.date;
  }
}
