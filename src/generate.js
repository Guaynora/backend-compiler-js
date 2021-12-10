const fs = require("fs");
const path = require("path");

async function Generate(ast) {
  const jsCode = generateJsForStatements(ast, []);
  //console.log(jsCode);
  await fs.writeFileSync("code.js", jsCode);
  return jsCode;
}

function generateJsForStatements(statements, declaredVariables) {
  const lines = [];
  for (let statment of statements) {
    const line = generateJSForStatementOrExp(statment, declaredVariables);
    lines.push(line);
  }
  return lines.join("\n");
}

function generateJSForStatementOrExp(node, declaredVariables) {
  if (node.type === "var_assign") {
    const varName = node.var_name.value;
    const jsExpr = generateJSForStatementOrExp(node.value, declaredVariables);
    console.log(declaredVariables.indexOf(varName));
    console.log(declaredVariables);
    if (declaredVariables.indexOf(varName) === -1) {
      const js = `let ${varName} = ${jsExpr}`;
      console.log(varName);
      declaredVariables.push(varName);
      return js;
    } else {
      const js = `${varName} = ${jsExpr}`;
      return js;
    }
  } else if (node.type === "fun_call") {
    const funName = node.fun_name.value;
    const argList = node.arguments
      .map((arg) => {
        return generateJSForStatementOrExp(arg, declaredVariables);
      })
      .join(", ");
    if (funName === "print") {
      return `console.log(${argList});`;
    } else {
      return `${funName}(${argList})`;
    }
  } else if (node.type === "binary_expression") {
    const left = generateJSForStatementOrExp(node.left, declaredVariables);
    const right = generateJSForStatementOrExp(node.right, declaredVariables);
    const operator = node.operator;
    return `${left} ${operator} ${right}`;
  } else if (node.type === "while_loop") {
    const condition = generateJSForStatementOrExp(
      node.condition,
      declaredVariables
    );
    const bodyMap = node.body.map((node) => {
      const body = generateJSForStatementOrExp(node, declaredVariables);
      return `  ${body}`;
    });
    const bodyWhile = bodyMap.join(",").replace(",", "\n");
    return `while (${condition}) {\n${bodyWhile}\n}`;
  } else if (node.type === "string") {
    return node.value;
  } else if (node.type === "number") {
    return node.value;
  } else if (node.type === "identifier") {
    return node.value;
  } else {
    throw new Error(`Unhandled AST node type ${node.type}`);
  }
}

module.exports = Generate;
