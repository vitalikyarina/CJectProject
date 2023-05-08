import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoute } from "../../enums";

@Component({
  selector: "cjp-sidenav",
  standalone: true,
  imports: [FlexLayoutModule, MatSidenavModule, MatButtonModule, RouterLink],
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent {
  protected routing = AppRoute;
}
