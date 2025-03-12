// eslint-plugin-class-member-oninit/tests/valid/valid3.ts
class MyController extends sap.ui.core.mvc.Controller {
  private myVariable: string;

  public onInit(): void {
    this.myVariable = "Initialized";
  }
}
