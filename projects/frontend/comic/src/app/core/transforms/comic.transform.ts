import { ComicDTO, ComicEntity, ResourceAdapter } from "../models";
import { ComicFactory } from "../services";

export function CEtoCDTO(value: ComicEntity | null): ComicDTO {
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
