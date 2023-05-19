import { Component, Signal, inject, signal } from "@angular/core";
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
  public sites: Signal<SiteEntity[]> = signal([]);

  private readonly formGroup: ComicCreateForm = inject(ComicCreateForm);
  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.getRawValue());
      // this.comicService
      //   .createOne(this.formGroup.getRawValue() as ComicCreateDTO)
      //   .pipe(untilDestroyed(this))
      //   .subscribe((createdComic) => {
      //     console.log(createdComic);

      //     this.router.navigateByUrl("/comics");
      //   });
    }
  }
}
