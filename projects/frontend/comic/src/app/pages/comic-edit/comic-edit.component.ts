import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ContentSectionActionComponent,
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { ComicFormComponent } from "@cjp-front/comic/shared";
import { ReactiveFormsModule } from "@angular/forms";
import { ComicState, SiteState } from "@cjp-front/comic/core";
import { ComicEditParameter } from "./enums";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentSectionComponent,
    ContentSectionTitleComponent,
    ContentSectionContentComponent,
    ContentSectionActionComponent,
    MatButtonModule,
    ComicFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./comic-edit.component.html",
  styleUrls: ["./comic-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicEditComponent {
  @ViewChild("form") form!: ComicFormComponent;

  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  readonly comicState = inject(ComicState);
  readonly siteState = inject(SiteState);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = params[ComicEditParameter.COMIC_ID];
      this.comicState.selectedId$.next(id);
    });
    this.comicState.updateComicSuccess$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigate(["../../"], {
          relativeTo: this.route,
        });
      });
  }

  protected onClick(): void {
    this.form.submit();
  }
}
