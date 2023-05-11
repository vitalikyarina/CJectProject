import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type BaseFormAbstractor<T> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<any, any>
          ? FormGroup<BaseFormAbstractor<R>>
          : FormControl<R>
      >
    : T[K] extends Record<any, any>
    ? FormGroup<BaseFormAbstractor<T[K]>>
    : FormControl<T[K]>;
};
