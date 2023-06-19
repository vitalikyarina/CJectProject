import { IResourceForm } from "./resource-form.interfaces";

export interface IComicForm {
  name: string;
  altNames: string[];
  resources: IResourceForm[];
}
