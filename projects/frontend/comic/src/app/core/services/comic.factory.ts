import { ResourceType } from "@cjp/shared/comic";
import { ComicDTO, ResourceDTO } from "../models";

export class ComicFactory {
  static createComicDTO(): ComicDTO {
    const resources = [this.createResourceDTO()];

    return {
      name: "",
      altNames: [],
      resources: resources,
    };
  }

  static createResourceDTO(): ResourceDTO {
    return {
      _id: null,
      path: "",
      priority: 0,
      siteData: "",
      type: ResourceType.DEFAULT,
    };
  }
}
