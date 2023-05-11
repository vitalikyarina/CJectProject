import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ComicStore, SiteStore } from "../../store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./comic-layout.component.html",
  styleUrls: ["./comic-layout.component.scss"],
  providers: [ComicStore, SiteStore],
})
export class ComicLayoutComponent implements OnInit {
  private comicStore: ComicStore = inject(ComicStore);
  private comicSiteStore: SiteStore = inject(SiteStore);

  public ngOnInit(): void {
    this.comicStore.loadEntities().pipe(untilDestroyed(this)).subscribe();
    this.comicSiteStore.loadEntities().pipe(untilDestroyed(this)).subscribe();
  }
}
