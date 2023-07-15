import { Component, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ContentSectionActionComponent,
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ComicFormComponent } from "@cjp-front/comic/shared";
import { MatButtonModule } from "@angular/material/button";
import { ComicState, SiteState } from "@cjp-front/comic/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentSectionComponent,
    ContentSectionTitleComponent,
    ContentSectionContentComponent,
    ContentSectionActionComponent,
    ComicFormComponent,
    MatButtonModule,
  ],
  templateUrl: "./comic-create.component.html",
  styleUrls: ["./comic-create.component.scss"],
})
export class ComicCreateComponent {
  @ViewChild("form") form!: ComicFormComponent;

  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  readonly comicState = inject(ComicState);
  readonly siteState = inject(SiteState);

  constructor() {
    this.comicState.createComicSuccess$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigate(["../"], {
          relativeTo: this.route,
        });
      });
  }

  protected onClick(): void {
    this.form.submit();
  }
}
