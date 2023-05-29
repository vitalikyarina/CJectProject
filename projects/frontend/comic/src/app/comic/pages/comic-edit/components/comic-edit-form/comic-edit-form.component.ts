import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cjp-comic-edit-form",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./comic-edit-form.component.html",
  styleUrls: ["./comic-edit-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicEditFormComponent {}
