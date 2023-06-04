import { FormControl } from "@angular/forms";

export interface IResourceForm {
  link: FormControl<string>;
  type: FormControl<number>;
  siteData: FormControl<string>;
  priority: FormControl<number>;
  _id: FormControl<string | null>;
}
