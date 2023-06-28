import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
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
import { ComicEntity, ResourceDTO, SiteEntity } from "@cjp-front/comic/core";
import { ComicFormDef, ResourceFormDef } from "./types";
import { IComicForm } from "./interfaces";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "cjp-comic-form",
  standalone: true,
  imports: [
    CommonModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicFormComponent implements OnInit {
  @Input({ required: true }) sites!: SiteEntity[];
  @Input() comic!: ComicEntity;
  @Output() submitForm = new EventEmitter<IComicForm>();

  protected resourceTypes = ResourceType;

  protected fb = inject(FormBuilder);
  protected formGroup!: FormGroup<ComicFormDef>;

  public ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  public submit(): void {
    if (this.formGroup.valid) {
      const value = this.formGroup.value as IComicForm;
      this.submitForm.next(value);
    }
  }

  protected onLinkInput(resourceForm: FormGroup<ResourceFormDef>): void {
    const link = resourceForm.controls.link.value;
    const https = "https://";
    const raw = "-raw";
    if (link.indexOf(https) === 0) {
      const siteBase = link.split("/")[2];
      const site = this.sites.find((site) => site.name == siteBase);
      if (site) {
        resourceForm.controls.siteData.setValue(site._id);
      }
    }
    if (link.indexOf(raw) > -1) {
      resourceForm.controls.type.setValue(ResourceType.RAW);
    } else {
      resourceForm.controls.type.setValue(ResourceType.DEFAULT);
    }
  }

  protected addNewAltName(value = ""): void {
    this.formGroup.controls.altNames.push(
      new FormControl(value, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    );
  }

  protected delAltName(index: number): void {
    this.formGroup.controls.altNames.removeAt(index);
  }

  protected addNewResource(): void {
    const resForm = this.createResourceForm();
    this.formGroup.controls.resources.push(resForm);
    //this.updateValueAndValidity();
    resForm.controls.link.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.onLinkInput(resForm);
      });
  }

  protected delResource(index: number): void {
    this.formGroup.controls.resources.removeAt(index);
  }

  protected drop(event: CdkDragDrop<string[]>): void {
    const controls = this.formGroup.controls.resources.controls;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    controls.map((res, index) => res.controls.priority.setValue(index));
    //this.formGroup.controls.resources.updateValueAndValidity();
  }

  protected trackByFn(index: number): number {
    return index;
  }

  private createForm(): FormGroup<ComicFormDef> {
    const form = this.fb.group({
      name: this.fb.control("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      altNames: this.fb.array<FormControl<string>>([]),
      resources: this.fb.array<FormGroup<ResourceFormDef>>([]),
    });

    return form;
  }

  private createResourceForm(value?: ResourceDTO): FormGroup<ResourceFormDef> {
    const resLength = this.formGroup.controls.resources.controls.length;
    const form = this.fb.group({
      link: this.fb.control(value?.link || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      _id: this.fb.control(value?._id || null),
      priority: this.fb.control(value?.priority || resLength, {
        nonNullable: true,
      }),
      siteData: this.fb.control(value?.siteData || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      type: this.fb.control(value?.type || ResourceType.DEFAULT, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    return form;
  }
}
