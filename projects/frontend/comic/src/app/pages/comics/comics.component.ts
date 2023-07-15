import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicEntity } from "../../core/models";
import {
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { ComicCardComponent } from "./components";
import { ComicState } from "@cjp-front/comic/core";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicsComponent {
  readonly comicState: ComicState = inject(ComicState);

  public trackByFn(index: number, element: ComicEntity): string {
    return element._id;
  }
}
