import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ComicStore, SiteStore } from "./store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: "cjp-comic-layout",
  template: `<router-outlet />`,
  providers: [ComicStore, SiteStore],
})
export class RemoteEntryComponent implements OnInit {
  private comicStore: ComicStore = inject(ComicStore);
  private comicSiteStore: SiteStore = inject(SiteStore);

  public ngOnInit(): void {
    this.comicStore.loadEntities().pipe(untilDestroyed(this)).subscribe();
    this.comicSiteStore.loadEntities().pipe(untilDestroyed(this)).subscribe();
  }
}
