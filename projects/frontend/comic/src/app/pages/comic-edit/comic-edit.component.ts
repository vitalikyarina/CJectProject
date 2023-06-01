import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ContentSectionActionComponent,
  ContentSectionComponent,
  ContentSectionContentComponent,
  ContentSectionTitleComponent,
} from "@cjp-front/content-section";
import { MatButtonModule } from "@angular/material/button";
import { ComicEditFormComponent } from "./components";
import { SiteEntity } from "../../core/models";
import { ComicEditForm } from "./forms/comic-edit.form";
import { ActivatedRoute, Router } from "@angular/router";
import { ComicService } from "../../services";
import { Select } from "@ngxs/store";
import { ComicState } from "../../core";
import { Observable } from "rxjs";
import { FORM_EDIT_DATA } from "./tokens";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentSectionComponent,
    ContentSectionTitleComponent,
    ContentSectionContentComponent,
    ContentSectionActionComponent,
    MatButtonModule,
    ComicEditFormComponent,
  ],
  templateUrl: "./comic-edit.component.html",
  styleUrls: ["./comic-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ComicEditForm,
    // {
    //   provide: FORM_EDIT_DATA,
    //   useFactory: () => {
    //     const route = inject(ActivatedRoute);
    //     const cs = inject(ComicState);

    //     const id = route.snapshot.params["comicId"];
    //     //const comic = comicState.data().find((entity) => entity._id === id);
    //     return null;
    //   },
    //   deps: [ComicState],
    // },
  ],
})
export class ComicEditComponent {
  @Select(ComicState.sites) public sites$!: Observable<SiteEntity[]>;

  private readonly formGroup: ComicEditForm = inject(ComicEditForm);
  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.getRawValue());
    }
  }
}
