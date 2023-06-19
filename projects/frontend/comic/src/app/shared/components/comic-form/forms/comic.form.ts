import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { ResourceDTO } from "@cjp-front/comic/core";
import { ResourceType } from "@cjp/shared/comic";
import { ComicFormDef, ResourceFormDef } from "../types";

@Injectable()
export class ComicForm extends FormGroup<ComicFormDef> {
  constructor() {
    super(
      {
        name: new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        altNames: new FormArray<FormControl<string>>([]),
        resources: new FormArray<FormGroup<ResourceFormDef>>([], {
          updateOn: "blur",
        }),
      },
      {
        updateOn: "blur",
      },
    );

    this.addResource();
  }

  public addResource(value?: ResourceDTO): void {
    const resForm = this.getResourceForm(value);
    this.controls.resources.push(resForm);
    this.updateValueAndValidity();
  }

  public deleteResource(index: number): void {
    this.controls.resources.removeAt(index);
  }

  public addAltName(value = ""): void {
    this.controls.altNames.controls.push(
      new FormControl(value, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    );
  }

  public deleteAltName(index: number): void {
    this.controls.altNames.removeAt(index);
  }

  protected getResourceForm(value?: ResourceDTO): FormGroup<ResourceFormDef> {
    const resLength = this.controls.resources.controls.length;
    const form = new FormGroup<ResourceFormDef>(
      {
        link: new FormControl(value?.link || "", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        _id: new FormControl(value?._id || null),
        priority: new FormControl(value?.priority || resLength, {
          nonNullable: true,
        }),
        siteData: new FormControl(value?.siteData || "", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        type: new FormControl(value?.type || ResourceType.DEFAULT, {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      {
        updateOn: "blur",
      },
    );

    return form;
  }
}
