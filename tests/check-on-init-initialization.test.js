const { RuleTester } = require("eslint");
const rule = require("../rules/check-on-init-initialization");
const fs = require("fs");
const path = require("path");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

function readFile(filePath) {
  return fs
    .readFileSync(path.resolve(__dirname, filePath), "utf-8")
    .replace(/\r/g, "");
}

ruleTester.run("check-on-init-initialization", rule, {
  valid: [
    {
      name: "Initialization at declaration (need to check if ui5 actually allows this)",
      code: readFile("./valid/valid1.ts"),
    },
    {
      name: "Optional property (not required)",
      code: readFile("./valid/valid2.ts"),
    },
    {
      name: "Initialization in onInit method",
      code: readFile("./valid/valid3.ts"),
    },
    {
      name: "Initialization through function called by onInit",
      code: readFile("./valid/valid4.ts"),
    },
  ],
  invalid: [
    {
      name: "Missing initialization",
      code: readFile("./invalid/invalid1.ts"),
      errors: [
        {
          message:
            "Property 'myVariable' is not initialized at declaration, in onInit method, or through functions called by onInit",
        },
      ],
    },
    {
      name: "Initialized of same name in subobject (incorrect initialization)",
      code: readFile("./invalid/invalid2.ts"),
      errors: [
        {
          message:
            "Property 'myVariable' is not initialized at declaration, in onInit method, or through functions called by onInit",
        },
      ],
    },
    {
      name: "Initialization in a function not called by onInit",
      code: readFile("./invalid/invalid3.ts"),
      errors: [
        {
          message:
            "Property 'myVariable' is not initialized at declaration, in onInit method, or through functions called by onInit",
        },
      ],
    },
  ],
});
