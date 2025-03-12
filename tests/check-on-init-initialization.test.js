// eslint-plugin-class-member-oninit/tests/check-on-init-initialization.test.js
const { RuleTester } = require("eslint");
const rule = require("../rules/check-on-init-initialization");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("check-on-init-initialization", rule, {
  valid: [
    {
      code: `
        class MyController extends sap.ui.core.mvc.Controller {
          private myVariable: string = "Initialized";

          public onInit(): void {
            // Initialization logic
          }
        }
      `,
    },
    {
      code: `
        class MyController extends sap.ui.core.mvc.Controller {
          private myVariable?: string;

          public onInit(): void {
            // Initialization logic
          }
        }
      `,
    },
    {
      code: `
        class MyController extends sap.ui.core.mvc.Controller {
          private myVariable: string;

          public onInit(): void {
            this.myVariable = "Initialized";
          }
        }
      `,
    },
    {
      code: `
        class MyController extends sap.ui.core.mvc.Controller {
          private myVariable: string;

          public onInit(): void {
            this.initializeVariable();
          }

          private initializeVariable(): void {
            this.myVariable = "Initialized";
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class MyController extends sap.ui.core.mvc.Controller {
          private myVariable: string;

          public onInit(): void {
            // Initialization logic
          }
        }
      `,
      errors: [
        {
          message:
            "Property 'myVariable' is not initialized at declaration, in onInit method, or through functions called by onInit",
        },
      ],
    },
  ],
});
