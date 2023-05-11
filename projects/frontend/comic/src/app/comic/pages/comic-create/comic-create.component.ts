import { Component, Input, Signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicCreateForm } from "./forms";
import {
  ContentSectionActionComponent,
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { ComicCreateFormComponent } from "./components";
import { Router } from "@angular/router";
import { ComicService } from "../../services";
import { ComicCreateDTO, SiteEntity } from "../../core/models";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SiteStore } from "../../store";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentSectionComponent,
    ContentSectionTitleComponent,
    ContentSectionContentComponent,
    ContentSectionActionComponent,
    ComicCreateFormComponent,
  ],
  templateUrl: "./comic-create.component.html",
  styleUrls: ["./comic-create.component.scss"],
  providers: [ComicCreateForm],
})
export class ComicCreateComponent {
  public sites: Signal<SiteEntity[]> = inject(SiteStore).data;

  private readonly formGroup: ComicCreateForm = inject(ComicCreateForm);
  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    if (this.formGroup.valid) {
      this.comicService
        .createOne(this.formGroup.getRawValue() as ComicCreateDTO)
        .pipe(untilDestroyed(this))
        .subscribe((createdComic) => {
          console.log(createdComic);

          this.router.navigateByUrl("/comics");
        });
    }
  }
}
