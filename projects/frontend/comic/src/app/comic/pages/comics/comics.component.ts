import { Component, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicEntity } from "../../core/models";
import { ComicStore } from "../../store";
import {
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { ComicCardComponent } from "../../components";
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentSectionComponent,
    ContentSectionTitleComponent,
    ContentSectionContentComponent,
    ComicCardComponent,
  ],
  templateUrl: "./comics.component.html",
  styleUrls: ["./comics.component.scss"],
})
export class ComicsComponent {
  public comics: Signal<ComicEntity[]>;

  constructor(private comicStore: ComicStore) {
    this.comics = this.comicStore.data;
  }
}
