import { Injectable, computed, inject, signal } from "@angular/core";
import { ComicDTO, ComicModel } from "../models";
import { ArrayState, StateStatus } from "@cjp-front/state";
import { ComicService } from "../services";
import { EMPTY, Subject, retry, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IComicState } from "../interfaces";

@Injectable()
export class ComicState extends ArrayState<ComicModel> {
  private readonly comicService = inject(ComicService);

  protected override state = signal<IComicState>({
    data: [],
    status: StateStatus.LOADING,
    error: null,
    selectedId: null,
  });

  comics = computed(() => this.state().data);
  selectedComic = computed(() => {
    const id = this.state().selectedId;
    if (id) {
      return this.state().data.find((comic) => comic._id === id)!;
    }
    return null;
  });

  comics$ = this.comicService.getAll().pipe(
    retry({
      delay: (err) => {
        this.error$.next(err);
        return this.retry$;
      },
    }),
  );

  createComic$ = new Subject<ComicDTO>();
  createComicSuccess$ = new Subject<void>();
  updateComic$ = new Subject<ComicDTO>();
  updateComicSuccess$ = new Subject<void>();

  selectedId$ = new Subject<string | null>();

  constructor() {
    super();
    this.comics$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.state.update((state) => ({
        ...state,
        data,
        status: StateStatus.SUCCESS,
      }));
    });

    this.selectedId$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.state.update((state) => ({
        ...state,
        selectedId: id,
      }));
    });

    this.createComic$
      .pipe(
        switchMap((comic) => {
          return this.comicService.createOne(comic);
        }),
        takeUntilDestroyed(),
      )
      .subscribe((newComic) => {
        this.state.update((state) => ({
          ...state,
          data: [...state.data, newComic],
        }));
        this.createComicSuccess$.next();
      });

    this.updateComic$
      .pipe(
        switchMap((comic) => {
          const id = this.state().selectedId;
          if (id) {
            return this.comicService.updateOneById(id, comic);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(),
      )
      .subscribe((newComic) => {
        this.state.mutate((state) => {
          const index = state.data.findIndex(
            (comic) => comic._id === newComic._id,
          );
          if (index >= 0) {
            state.data[index] = newComic;
          }
          return state;
        });
        this.updateComicSuccess$.next();
      });
  }
}
