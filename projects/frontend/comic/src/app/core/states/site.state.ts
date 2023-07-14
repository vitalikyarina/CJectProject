import { Injectable, computed, inject } from "@angular/core";
import { ArrayState, StateStatus } from "@cjp-front/state";
import { SiteEntity } from "../models";
import { SiteService } from "../services";
import { retry } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class SiteState extends ArrayState<SiteEntity> {
  private readonly siteService = inject(SiteService);

  sites = computed(() => this.state().data);

  sites$ = this.siteService.getAll().pipe(
    retry({
      delay: (err) => {
        this.error$.next(err);
        return this.retry$;
      },
    }),
  );

  constructor() {
    super();

    this.sites$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.state.update((state) => ({
        ...state,
        data,
        status: StateStatus.SUCCESS,
      }));
    });
  }
}
