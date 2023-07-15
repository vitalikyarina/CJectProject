import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ComicFormDef, ResourceFormDef } from "../types";
import { ComicDTO } from "@cjp-front/comic/core";
import { ResourceType } from "@cjp/shared/comic";

export class ComicForm extends FormGroup<ComicFormDef> {
  public get resourceForms(): FormArray<FormGroup<ResourceFormDef>> {
    return this.controls.resources;
  }

  constructor(readonly data: ComicDTO) {
    super({
      name: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      altNames: new FormArray<FormControl<string>>([]),
      resources: new FormArray<FormGroup<ResourceFormDef>>([]),
    });

    this.initValue();
  }

  public createEmptyResource(): void {
    const priority = this.controls.resources.controls.length || 0;

    const form: FormGroup<ResourceFormDef> = new FormGroup({
      path: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      priority: new FormControl(priority, {
        nonNullable: true,
      }),
      _id: new FormControl<string | null>(null),
      siteData: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      type: new FormControl<ResourceType>(ResourceType.DEFAULT, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.resourceForms.push(form);
  }

  public removeResourceByIndex(index: number): void {
    this.resourceForms.removeAt(index);
  }

  public createEmptyAltName(): void {
    this.controls.altNames.push(
      new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    );
  }

  public removeAltNameByIndex(index: number): void {
    this.controls.altNames.removeAt(index);
  }

  private initValue(): void {
    const resources = this.data.resources;
    const altNames = this.data.altNames;
    resources.map(() => {
      this.createEmptyResource();
    });
    altNames.map(() => {
      this.createEmptyAltName();
    });
    this.setValue(this.data);
  }
}
