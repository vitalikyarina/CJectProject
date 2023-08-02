import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
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
import { ComicDTO, SiteModel } from "@cjp-front/comic/core";
import { ResourceFormDef } from "./types";
import { ComicFormHelperService } from "./services";
import { ComicForm } from "./forms";
import { take } from "rxjs";
import { CEtoCDTO } from "@cjp-front/comic/core/transforms";
import { ComicFactory as CF } from "@cjp-front/comic/core/services";

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
  providers: [ComicFormHelperService],
})
export class ComicFormComponent implements OnInit {
  @Input({ required: true }) sites!: SiteModel[];
  @Input({ transform: CEtoCDTO }) comic: ComicDTO = CF.createComicDTO();

  @Output() submitForm = new EventEmitter<ComicDTO>();

  public formGroup!: ComicForm;

  protected resourceTypes = ResourceType;

  private cd = inject(ChangeDetectorRef);
  private helper = inject(ComicFormHelperService);

  ngOnInit(): void {
    this.formGroup = new ComicForm(this.comic);
  }

  public submit(): void {
    this.formGroup.markAllAsTouched();
    this.cd.markForCheck();
    if (this.formGroup.valid) {
      const value = this.formGroup.value as ComicDTO;
      value.resources.map((resource) => {
        if (!resource._id) {
          delete resource._id;
        }
      });
      this.submitForm.next(value);
    }
  }

  public addResourceForm(): void {
    this.formGroup.createEmptyResource();
  }

  public removeResourceForm(index: number): void {
    this.formGroup.removeResourceByIndex(index);
    this.updatePriority();
  }

  public addAltNameControl(): void {
    this.formGroup.createEmptyAltName();
  }

  public removeAltNameControl(index: number): void {
    this.formGroup.removeAltNameByIndex(index);
  }

  public onPaste(event: ClipboardEvent, index: number): void {
    if (event.clipboardData) {
      const clipboardData: DataTransfer = event.clipboardData!;
      const value = clipboardData.getData("text");
      const form = this.formGroup.resourceForms.controls[index];
      form.controls.path.valueChanges.pipe(take(1)).subscribe(() => {
        this.onLinkInput(value, form);
      });
    }
  }

  public drop(event: CdkDragDrop<string[]>): void {
    const controls = this.formGroup.controls.resources.controls;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
    this.updatePriority();
  }

  protected updatePriority(): void {
    const controls = this.formGroup.controls.resources.controls;
    controls.map((res, index) => res.controls.priority.setValue(index));
  }

  protected onLinkInput(
    pasteLink: string,
    resourceForm: FormGroup<ResourceFormDef>,
  ): void {
    const site = this.helper.getSiteByLink(this.sites, pasteLink);
    if (site) {
      resourceForm.controls.site.setValue(site._id);
      let link = pasteLink.replace(site.baseLink, "");
      if (link[link.length - 1] === "/") {
        link = link.slice(0, -1);
      }
      resourceForm.controls.path.setValue(link);
    }

    if (this.helper.isRaw(pasteLink)) {
      resourceForm.controls.type.setValue(ResourceType.RAW);
    } else {
      resourceForm.controls.type.setValue(ResourceType.DEFAULT);
    }
  }

  protected trackByFn(index: number): number {
    return index;
  }
}
