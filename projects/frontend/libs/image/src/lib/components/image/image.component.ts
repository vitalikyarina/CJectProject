import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cjp-image",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent {
  @Input({ required: true }) public link!: string;
  @Input() public alt!: string;

  protected open(): void {
    console.log("");
  }
}
