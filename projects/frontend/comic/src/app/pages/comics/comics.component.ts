import { Component, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicEntity } from "../../core/models";
import {
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { ComicCardComponent } from "../../components";
import { Select } from "@ngxs/store";
import { ComicState } from "../../core";
import { Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

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
  @Select(ComicState.comics) public comics$!: Observable<ComicEntity[]>;
  public comics: Signal<ComicEntity[] | undefined> = toSignal<ComicEntity[]>(
    this.comics$,
  );

  public trackByFn(index: number, element: ComicEntity): string {
    return element._id;
  }
}
