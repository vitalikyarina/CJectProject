import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { DefaultKey } from "./key.type";

export type FormGroupDef<T> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<DefaultKey, any>
          ? FormGroup<FormGroupDef<R>>
          : FormControl<R>
      >
    : T[K] extends Record<DefaultKey, any>
    ? FormGroup<FormGroupDef<T[K]>>
    : FormControl<T[K]>;
};
