import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "cjp-content-section",
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: "./content-section.component.html",
  styleUrls: ["./content-section.component.scss"],
})
export class ContentSectionComponent {}
