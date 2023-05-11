import { Component, HostBinding, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridModule } from "@angular/flex-layout";

@Component({
  selector: "cjp-form-group-row",
  standalone: true,
  imports: [CommonModule, GridModule],
  templateUrl: "./form-group-row.component.html",
})
export class FormGroupRowComponent {
  @HostBinding("style.grid-column-end") public gridColumnEnd = "7";
  @HostBinding("style.grid-column-start") public gridColumnStart = "1";
  protected columnStyle = "repeat(6, 1fr)";

  @Input() public get column(): number {
    return this._column;
  }

  public set column(value: number) {
    if (!!value && value !== this._column) {
      this._column = value;
      this.columnStyle = "repeat(" + this._column + ", 1fr)";
      this.gridColumnEnd = (this._column + 1).toString();
    }
  }

  private _column = 6;
}
