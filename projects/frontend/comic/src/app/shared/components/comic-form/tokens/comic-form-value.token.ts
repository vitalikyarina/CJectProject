import { InjectionToken } from "@angular/core";
import { ComicDTO } from "@cjp-front/comic/core";
import { ResourceType } from "@cjp/shared/comic";

export const COMIC_FORM_VALUE = new InjectionToken<ComicDTO>(
  "COMIC_FORM_VALUE",
  {
    factory: () => ({
      name: "",
      altNames: [],
      resources: [
        {
          _id: null,
          path: "",
          priority: 0,
          siteData: "",
          type: ResourceType.DEFAULT,
        },
      ],
    }),
  },
);
