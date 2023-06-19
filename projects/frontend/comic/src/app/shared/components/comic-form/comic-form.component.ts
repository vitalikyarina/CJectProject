import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
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
import { ComicEntity, SiteEntity } from "@cjp-front/comic/core";
import { ComicForm } from "./forms";

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
})
export class ComicFormComponent {
  @Input({ required: true }) sites!: SiteEntity[];
  @Input() comic!: ComicEntity;

  protected resourceTypes = ResourceType;
  protected formGroup: ComicForm = inject(ComicForm);

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

  protected addNewAltName(value = ""): void {
    this.formGroup.addAltName(value);
  }

  protected delAltName(index: number): void {
    this.formGroup.deleteAltName(index);
  }

  protected addNewResource(): void {
    this.formGroup.addResource();
  }

  protected delResource(index: number): void {
    this.formGroup.deleteResource(index);
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
}
