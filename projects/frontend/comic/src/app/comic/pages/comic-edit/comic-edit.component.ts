import {
  ChangeDetectionStrategy,
  Component,
  Signal,
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
import { ComicEditFormComponent } from "./components";
import { SiteEntity } from "../../core/models";
import { SiteStore } from "../../store";
import { ComicEditForm } from "./forms/comic-edit.form";
import { Router } from "@angular/router";
import { ComicService } from "../../services";

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
  providers: [ComicEditForm],
})
export class ComicEditComponent {
  public sites: Signal<SiteEntity[]> = inject(SiteStore).data;

  private readonly formGroup: ComicEditForm = inject(ComicEditForm);
  private readonly router: Router = inject(Router);
  private readonly comicService: ComicService = inject(ComicService);

  protected onClick(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}
