import { Component, Signal, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ContentSectionActionComponent,
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { Router } from "@angular/router";
import { ComicService } from "../../services";
import { ComicDTO, SiteEntity } from "../../core/models";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select } from "@ngxs/store";
import { ComicState } from "../../core";
import { Observable } from "rxjs";
import { ComicFormComponent } from "@cjp-front/comic/shared";
import { MatButtonModule } from "@angular/material/button";
import { ComicForm } from "@cjp-front/comic/shared/components/comic-form/forms";

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
  providers: [ComicForm],
})
export class ComicCreateComponent {
  @Select(ComicState.sites) public sites$!: Observable<SiteEntity[]>;

  public readonly form: ComicForm = inject(ComicForm);

  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    //this.form.controls.resources.updateValueAndValidity();
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log(this.form);

      console.log(this.form.getRawValue());
    }
    // if (this.formGroup.valid) {
    //   console.log(this.formGroup.getRawValue());
    //   this.comicService
    //     .createOne(this.formGroup.getRawValue() as ComicDTO)
    //     .pipe(untilDestroyed(this))
    //     .subscribe((createdComic) => {
    //       console.log(createdComic);
    //       this.router.navigateByUrl("/comics");
    //     });
    // }
  }
}
