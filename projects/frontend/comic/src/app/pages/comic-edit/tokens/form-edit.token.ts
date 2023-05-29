import { InjectionToken, inject } from "@angular/core";
import { ComicEntity } from "../../../core/models";
import { ActivatedRoute } from "@angular/router";
import { ComicService } from "../../../services";
import { ComicState } from "../../../core";

export const FORM_EDIT_DATA = new InjectionToken<ComicEntity>(
  "FORM_EDIT_DATA",
  // {
  //   factory: () => {
  //     const route = inject(ActivatedRoute);
  //     const comicState = inject(ComicState);
  //     const comicService = inject(ComicService);

  //     const id = route.snapshot.params["comicId"];
  //     const comic = comicState.data().find((entity) => entity._id === id);
  //     return comic as ComicEntity;
  //   },
  // },
);
