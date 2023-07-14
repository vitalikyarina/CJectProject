import { Injectable, computed, inject } from "@angular/core";
import { ComicEntity } from "../models";
import { ArrayState, StateStatus } from "@cjp-front/state";
import { ComicService } from "../services";
import { retry } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class ComicState extends ArrayState<ComicEntity> {
  private readonly comicService = inject(ComicService);

  comics = computed(() => this.state().data);

  comics$ = this.comicService.getAll().pipe(
    retry({
      delay: (err) => {
        this.error$.next(err);
        return this.retry$;
      },
    }),
  );

  constructor() {
    super();
    this.comics$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.state.update((state) => ({
        ...state,
        data,
        status: StateStatus.SUCCESS,
      }));
    });
  }

  getComicById(id: string): ComicEntity {
    const comic = this.comics().find((value) => value._id === id)!;

    console.log(comic);

    return comic;
  }
}
