import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { DefaultKey } from "./key.type";

export type FormGroupTransform<T> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<DefaultKey, unknown>
          ? FormGroup<FormGroupTransform<R>>
          : FormControl<R>
      >
    : T[K] extends Record<DefaultKey, unknown>
    ? FormGroup<FormGroupTransform<T[K]>>
    : FormControl<T[K]>;
};
