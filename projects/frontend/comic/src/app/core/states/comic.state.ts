import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { ComicEntity, ComicStateName, IComicState, SiteEntity } from "..";
import { Injectable, inject } from "@angular/core";
import { LoadComics, LoadSites } from "./comic.action";
import { Observable, tap } from "rxjs";
import { ComicService, SiteService } from "../../services";

@State<IComicState>({
  name: ComicStateName.COMIC,
  defaults: {
    comics: [],
    sites: [],
  },
})
@Injectable()
export class ComicState implements NgxsOnInit {
  private comicService = inject(ComicService);
  private siteService = inject(SiteService);

  @Selector()
  public static comics(state: IComicState): ComicEntity[] {
    return state.comics;
  }

  @Selector()
  public static sites(state: IComicState): SiteEntity[] {
    return state.sites;
  }

  public ngxsOnInit(ctx: StateContext<IComicState>): void {
    ctx.dispatch([new LoadComics(), new LoadSites()]);
  }

  @Action(LoadComics)
  private loadComics(
    ctx: StateContext<IComicState>,
  ): Observable<ComicEntity[]> {
    return this.comicService.getAll().pipe(
      tap((entities) => {
        ctx.patchState({
          comics: entities,
        });
      }),
    );
  }

  @Action(LoadSites)
  private loadSites(ctx: StateContext<IComicState>): Observable<SiteEntity[]> {
    return this.siteService.getAll().pipe(
      tap((entities) => {
        ctx.patchState({
          sites: entities,
        });
      }),
    );
  }
}
