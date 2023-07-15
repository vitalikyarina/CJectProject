import { TestBed } from "@angular/core/testing";
import { ComicFormComponent } from "./comic-form.component";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

const DEFAULT_COMIC_VALUE = {
  name: "Test",
  altNames: [],
  resources: [
    {
      _id: null,
      path: "Test",
      priority: 0,
      siteData: "asd",
      type: 0,
    },
    {
      _id: null,
      path: "Test2",
      priority: 1,
      siteData: "asd",
      type: 0,
    },
    {
      _id: null,
      path: "Test3",
      priority: 2,
      siteData: "asd",
      type: 0,
    },
  ],
};

describe("ComicFormComponent", () => {
  it("form must be INVALID", () => {
    const fixture = TestBed.createComponent(ComicFormComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.submit();
    const formStatus = app.formGroup.status === "INVALID";
    expect(formStatus).toBeTruthy();
  });

  it("form must be VALID", () => {
    const fixture = TestBed.createComponent(ComicFormComponent);
    const app = fixture.componentInstance;
    app.comic = DEFAULT_COMIC_VALUE;
    app.ngOnInit();
    app.submit();
    const formStatus = app.formGroup.status === "VALID";
    expect(formStatus).toBeTruthy();
  });

  it("drag and drop worked", () => {
    const fixture = TestBed.createComponent(ComicFormComponent);
    const app = fixture.componentInstance;
    app.comic = DEFAULT_COMIC_VALUE;
    app.ngOnInit();
    app.submit();
    app.drop({
      currentIndex: 0,
      previousIndex: 2,
    } as CdkDragDrop<string[]>);
    const dndName3 =
      app.formGroup.controls.resources.controls[0].controls.path.value ===
      "Test3";
    const dndName1 =
      app.formGroup.controls.resources.controls[1].controls.path.value ===
      "Test";
    const dndName2 =
      app.formGroup.controls.resources.controls[2].controls.path.value ===
      "Test2";
    expect(dndName3 && dndName1 && dndName2).toBeTruthy();
  });
});
