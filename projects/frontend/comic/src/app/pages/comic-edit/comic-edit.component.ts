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
import { SiteEntity } from "../../core/models";
import { ActivatedRoute, Router } from "@angular/router";
import { ComicService } from "../../services";
import { Select } from "@ngxs/store";
import { ComicState } from "../../core";
import { Observable } from "rxjs";
import { ComicFormComponent } from "@cjp-front/comic/shared";
import { ReactiveFormsModule } from "@angular/forms";

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
  @Select(ComicState.sites) public sites$!: Observable<SiteEntity[]>;

  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    console.log("");
  }
}
