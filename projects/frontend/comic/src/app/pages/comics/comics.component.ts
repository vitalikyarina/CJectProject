import { Component, Signal, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicEntity } from "../../core/models";
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
  public comics: Signal<ComicEntity[]> = signal([]);

  constructor() {}

  public trackByFn(index: number, element: ComicEntity): string {
    return element._id;
  }
}
