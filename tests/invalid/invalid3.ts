// eslint-plugin-class-member-oninit/tests/invalid/invalid3.ts
class MyController extends sap.ui.core.mvc.Controller {
  private myVariable: string;

  public onInit(): void {
    // Initialization logic
  }

  private someOtherFunction(): void {
    this.myVariable = "Initialized";
  }
}
