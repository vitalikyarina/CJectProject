import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: "cjp-comic-layout",
  template: `<router-outlet />`,
})
export class RemoteEntryComponent {}
