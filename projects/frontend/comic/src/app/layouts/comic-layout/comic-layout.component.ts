import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComicState, SiteState } from "@cjp-front/comic/core";
import { NgIf } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, FlexLayoutModule, RouterOutlet, NgIf],
  selector: "cjp-comic-layout",
  templateUrl: "comic-layout.component.html",
  styleUrls: ["comic-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {
  private readonly siteState = inject(SiteState);
  private readonly comicState = inject(ComicState);

  isLoaded = computed(
    () => this.comicState.isSuccess() && this.siteState.isSuccess(),
  );
}
