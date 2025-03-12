// eslint-plugin-class-member-oninit/tests/invalid/invalid2.ts
class MyController extends sap.ui.core.mvc.Controller {
  private myVariable: string;
  private model?: { myVariable: string };

  public onInit(): void {
    // Initialization logic
    this.model.myVariable = "not initted myVariable";
  }
}
