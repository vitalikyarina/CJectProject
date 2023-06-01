import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseFormAbstractor } from "@cjp-front/shared";
import {
  ComicCreateDTO,
  ComicEntity,
  ResourceDTO,
} from "../../../core/models";
import { ResourceType } from "@cjp/shared/comic";

@Injectable()
export class ComicCreateForm extends FormGroup<
  BaseFormAbstractor<ComicCreateDTO>
> {
  constructor() {
    super({
      name: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      altNames: new FormArray<FormControl>([]),
      resources: new FormArray<
        FormGroup<BaseFormAbstractor<ResourceDTO>>
      >([]),
    });

    this.addResourceFormGroup();
  }

  public static ComicCreateFormConvector(comic: ComicEntity): ComicCreateDTO {
    const resources: ResourceDTO[] = comic.resources.map((res) => {
      const comicResource = res;
      const siteDataId = comicResource.siteData._id;
      const returnRes: ResourceDTO = {
        link: comicResource.link,
        type: comicResource.type,
        siteData: siteDataId,
        priority: comicResource.priority,
      };
      return returnRes;
    });

    const comicCreateForm: ComicCreateDTO = {
      name: comic.name,
      altNames: comic.altNames,
      resources: resources,
    };

    return comicCreateForm;
  }

  public override setValue(
    value: ComicCreateDTO,
    options?:
      | { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined }
      | undefined,
  ): void {
    this.controls.name.setValue(value.name, options);
    value.altNames.map((altName) => this.addAltNameControl(altName));
    if (value.resources.length > 0) {
      const resource0 = value.resources[0];
      value.resources.splice(0, 1);
      const resource0Control = this.controls.resources.controls[0];

      resource0Control.setValue(resource0, options);
    }
    value.resources.map((res) => this.addResourceFormGroup(res));
  }

  public addAltNameControl(value = ""): void {
    this.controls.altNames.push(
      new FormControl(value, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    );
  }

  public addResourceFormGroup(value?: ResourceDTO): void {
    const length = this.controls.resources.length;
    this.controls.resources.push(
      new FormGroup({
        link: new FormControl(value?.link || "", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        type: new FormControl(value?.type || ResourceType.DEFAULT, {
          nonNullable: true,
        }),
        siteData: new FormControl(value?.siteData || "", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        priority: new FormControl(
          { value: value?.priority || length, disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
      }),
    );
  }
}
