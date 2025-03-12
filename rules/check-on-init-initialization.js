// eslint-plugin-class-member-oninit/rules/check-on-init-initialization.js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure class properties are initialized at declaration or in onInit method or through functions called by onInit, unless marked as optional",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
  },
  create: function (context) {
    const sourceCode = context.getSourceCode();

    function isPropertyInitialized(property, statements) {
      const propertyName = property.key.name;
      return statements.some(
        (statement) =>
          statement.type === "ExpressionStatement" &&
          statement.expression.type === "AssignmentExpression" &&
          statement.expression.left.type === "MemberExpression" &&
          statement.expression.left.property.name === propertyName
      );
    }

    function getFunctionNode(functionName, scope) {
      return scope.block.body.body.find(
        (node) =>
          node.type === "MethodDefinition" && node.key.name === functionName
      );
    }

    function getClassBodyScope(statement) {
      let currentNode = statement;
      while (currentNode && currentNode.type !== "ClassBody") {
        currentNode = currentNode.parent;
      }
      return currentNode;
    }

    function checkFunctionCalls(
      property,
      statements,
      checkedFunctions = new Set()
    ) {
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      for (const statement of statements) {
        if (
          statement.type === "ExpressionStatement" &&
          statement.expression.type === "CallExpression"
        ) {
          const callee = statement.expression.callee;
          if (
            callee.type === "MemberExpression" &&
            callee.object.type === "ThisExpression"
          ) {
            const functionName = callee.property.name;
            if (!checkedFunctions.has(functionName)) {
              checkedFunctions.add(functionName);
              const classBodyScope = getClassBodyScope(statement);
              const scope = sourceCode.getScope
                ? sourceCode.getScope(classBodyScope)
                : context.getScope();
              const functionNode = getFunctionNode(functionName, scope);
              if (functionNode) {
                const functionStatements = functionNode.value.body.body;
                if (isPropertyInitialized(property, functionStatements)) {
                  return true;
                }
                if (
                  checkFunctionCalls(
                    property,
                    functionStatements,
                    checkedFunctions
                  )
                ) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    }

    return {
      MethodDefinition(node) {
        if (node.key.name === "onInit") {
          const classBody = node.parent && node.parent.body;
          if (!classBody) {
            console.log(classBody);
            return;
          }

          const properties = classBody.filter((member) => {
            console.log(member.type);
            return member.type === "PropertyDefinition";
          });

          properties.forEach((property) => {
            console.log(property);
            const propertyName = property.key.name;
            const isOptional = property.optional;
            const isInitializedAtDeclaration = property.value !== null;
            const isInitializedInOnInit = isPropertyInitialized(
              property,
              node.value.body.body
            );
            const isInitializedThroughFunctionCalls = checkFunctionCalls(
              property,
              node.value.body.body
            );

            if (
              !isOptional &&
              !isInitializedAtDeclaration &&
              !isInitializedInOnInit &&
              !isInitializedThroughFunctionCalls
            ) {
              context.report({
                node: property,
                message: `Property '${propertyName}' is not initialized at declaration, in onInit method, or through functions called by onInit`,
              });
            }
          });
        }
      },
    };
  },
};
