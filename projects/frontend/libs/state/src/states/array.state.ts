import { computed, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subject } from "rxjs";
import { StateStatus } from "../enums";
import { IArrayState } from "../interfaces";

export class ArrayState<T> {
  protected state = signal<IArrayState<T>>({
    data: [],
    status: StateStatus.LOADING,
    error: null,
  });

  error = computed(() => this.state().error);
  status = computed(() => this.state().status);

  isSuccess = computed(() => this.state().status === StateStatus.SUCCESS);

  retry$ = new Subject<void>();
  error$ = new Subject<Error>();

  constructor() {
    this.retry$.pipe(takeUntilDestroyed()).subscribe(() =>
      this.state.update((state) => ({
        ...state,
        status: StateStatus.LOADING,
      })),
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        status: StateStatus.ERROR,
        error: error.message,
      })),
    );
  }
}
