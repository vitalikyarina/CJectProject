import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";

@Component({
  selector: "cjp-header",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {}
