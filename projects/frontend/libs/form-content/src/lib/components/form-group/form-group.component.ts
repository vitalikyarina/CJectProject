import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridModule } from "@angular/flex-layout";
import { MatDividerModule } from "@angular/material/divider";
import { FormGroupRowComponent } from "..";

@Component({
  selector: "cjp-form-group",
  standalone: true,
  imports: [CommonModule, MatDividerModule, GridModule],
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.scss"],
})
export class FormGroupComponent implements AfterViewInit {
  @ContentChildren(FormGroupRowComponent)
  public formRows!: FormGroupRowComponent[];

  @Input() public set column(value: number | string) {
    value = +value;
    if (!!value && value !== this._column) {
      this._column = value;
      this.columnStyle = "repeat(" + this._column + ", 1fr)";
    }
  }

  public get column(): number {
    return this._column;
  }

  protected columnStyle = "repeat(6, 1fr)";
  private _column = 6;

  public ngAfterViewInit(): void {
    this.formRows.map((row) => {
      row.column = this.column;
    });
  }
}
