import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IResourceForm } from "./resource-form.interfaces";

export interface IComicForm {
  name: FormControl<string>;
  altNames: FormArray<FormControl<string>>;
  resources: FormArray<FormGroup<IResourceForm>>;
}
