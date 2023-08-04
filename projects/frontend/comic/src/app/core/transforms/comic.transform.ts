import { ComicDTO, ComicModel, ResourceAdapter } from "../models";
import { ComicFactory } from "../services";

export function CEtoCDTO(value: ComicModel | null): ComicDTO {
  if (!value) {
    return ComicFactory.createComicDTO();
  }
  const resources = value.resources.map((res) => ResourceAdapter.REtoRDTO(res));
  const adaptValue: ComicDTO = {
    altNames: value.altNames,
    name: value.name,
    resources,
  };

  return adaptValue;
}
