// eslint-plugin-class-member-oninit/tests/valid/valid4.ts
class MyController extends sap.ui.core.mvc.Controller {
  private myVariable: string;

  public onInit(): void {
    this.initializeVariable();
  }

  private initializeVariable(): void {
    this.myVariable = "Initialized";
  }
}
