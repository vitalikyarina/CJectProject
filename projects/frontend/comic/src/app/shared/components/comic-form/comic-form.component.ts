import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ResourceType } from "@cjp/shared/comic";
import {
  FormGroupComponent,
  FormGroupRowComponent,
} from "@cjp-front/form-content";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  ComicDTO,
  ComicEntity,
  ResourceDTO,
  SiteEntity,
} from "@cjp-front/comic/core";
import { IComicForm, IResourceForm } from "./interfaces";

@Component({
  selector: "cjp-comic-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule,
    FormGroupComponent,
    FormGroupRowComponent,
  ],
  templateUrl: "./comic-form.component.html",
  styleUrls: ["./comic-form.component.scss"],
})
export class ComicFormComponent {
  @Input({ required: true }) sites!: SiteEntity[];
  @Input() comic!: ComicEntity;
  @Output() submitForm = new EventEmitter();

  protected resourceTypes = ResourceType;
  protected readonly formGroup: FormGroup<IComicForm>;

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.formGroup = this.getInitForm(this.comic);
  }

  public submit(): void {
    console.log(this.formGroup);

    if (this.formGroup.valid) {
      const eventValue = this.formGroup.getRawValue();
      this.submitForm.next(eventValue);
    }
  }

  // protected onLinkInput(index: number): void {
  //   const resourceForm = this.formGroup.controls.resources.controls[index];
  //   const value = resourceForm.controls.link.value;
  //   const https = "https://";
  //   const raw = "-raw";
  //   if (value.indexOf(https) === 0) {
  //     const siteBase = value.split("/")[2];
  //     const site = this.sites.find((site) => site.name == siteBase);
  //     if (site) {
  //       resourceForm.controls.siteData.setValue(site._id);
  //     }
  //   }
  //   if (value.indexOf(raw) > -1) {
  //     resourceForm.controls.type.setValue(ResourceType.RAW);
  //   } else {
  //     resourceForm.controls.type.setValue(ResourceType.DEFAULT);
  //   }
  // }

  protected getInitForm(value?: ComicEntity): FormGroup<IComicForm> {
    const resourceForms: FormGroup<IResourceForm>[] = [];

    if (value && value.resources.length > 0) {
      console.log("log");
    } else {
      resourceForms.push(this.getResourceForm());
    }
    const form = this.fb.group<IComicForm>(
      {
        name: this.fb.control(value?.name || "", {
          validators: [Validators.required],
          nonNullable: true,
        }),
        altNames: this.fb.array<FormControl<string>>([]),
        resources: this.fb.array<FormGroup>(resourceForms),
      },
      { updateOn: "blur" },
    );

    return form;
  }

  protected getResourceForm(value?: ResourceDTO): FormGroup<IResourceForm> {
    const form = this.fb.group<IResourceForm>({
      link: this.fb.control(value?.link || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      type: this.fb.control(value?.type || ResourceType.DEFAULT, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      siteData: this.fb.control(value?.siteData || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      priority: this.fb.control(value?.priority || 0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      _id: this.fb.control(value?._id || null),
    });

    return form;
  }

  protected addAltName(value = ""): void {
    this.formGroup.controls.altNames.controls.push(
      new FormControl(value, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    );
  }

  protected delAltName(index: number): void {
    this.formGroup.controls.altNames.removeAt(index);
  }

  // protected addResource(): void {
  //   this.formGroup.addResourceFormGroup();
  // }

  // protected delResource(index: number): void {
  //   this.formGroup.controls.resources.removeAt(index);
  // }

  protected drop(event: CdkDragDrop<string[]>): void {
    const controls = this.formGroup.controls.resources.controls;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    controls.map((res, index) => res.controls.priority.setValue(index));
    this.formGroup.controls.resources.updateValueAndValidity();
  }
}
