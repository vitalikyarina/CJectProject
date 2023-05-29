import { InjectionToken, inject } from "@angular/core";
import { ComicEntity } from "../../../core/models";
import { ActivatedRoute } from "@angular/router";
import { ComicStore } from "../../../store";
import { ComicService } from "../../../services";

export const FORM_EDIT_DATA = new InjectionToken<ComicEntity>(
  "FORM_EDIT_DATA",
  {
    factory: () => {
      const route = inject(ActivatedRoute);
      const comicStore = inject(ComicStore);
      const comicService = inject(ComicService);

      const id = route.snapshot.params["comicId"];
      const comic = comicStore.data().find((entity) => entity._id === id);
      return comic as ComicEntity;
    },
  },
);
