import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridModule } from "@angular/flex-layout";

@Component({
  selector: "cjp-form-group-row",
  standalone: true,
  imports: [CommonModule, GridModule],
  templateUrl: "./form-group-row.component.html",
})
export class FormGroupRowComponent {
  protected columnStyle = "repeat(6, 1fr)";
  protected gridColumn = "1 / 7";

  @Input() public get column(): number {
    return this._column;
  }

  public set column(value: number) {
    if (!!value && value !== this._column) {
      this._column = value;
      this.columnStyle = "repeat(" + this._column + ", 1fr)";
      this.gridColumn = "1 / " + (this._column + 1).toString();
      this.cd.detectChanges();
    }
  }

  private cd = inject(ChangeDetectorRef);

  private _column = 6;
}
