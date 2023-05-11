import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent, SidenavComponent } from "./core";

@Component({
  selector: "cjp-root",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterOutlet,
    HeaderComponent,
    SidenavComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
