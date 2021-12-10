const fs = require("fs");
const path = require("path");

async function Generate(ast) {
  const jsCode = generateJsForStatements(ast);
  //console.log(jsCode);
  await fs.writeFileSync("code.js", jsCode);
  return jsCode;
}

function generateJsForStatements(statements) {
  const lines = [];
  for (let statment of statements) {
    const line = generateJSForStatementOrExp(statment);
    lines.push(line);
  }
  return lines.join("\n");
}

function generateJSForStatementOrExp(node) {
  if (node.type === "var_assign") {
    const varName = node.var_name.value;
    const jsExpr = generateJSForStatementOrExp(node.value);
    const js = `let ${varName} = ${jsExpr}`;
    return js;
  } else if (node.type === "fun_call") {
    const funName = node.fun_name.value;
    const argList = node.arguments
      .map((arg) => {
        return generateJSForStatementOrExp(arg);
      })
      .join(", ");
    if (funName === "print") {
      return `console.log(${argList});`;
    } else {
      return `${funName}(${argList})`;
    }
  } else if (node.type === "binary_expression") {
    const left = generateJSForStatementOrExp(node.left);
    const right = generateJSForStatementOrExp(node.right);
    const operator = node.operator;
    return `${left} ${operator} ${right}`;
  } else if (node.type === "while_loop") {
    const condition = generateJSForStatementOrExp(node.condition);
    const bodyMap = node.body.map((node) => {
      const body = generateJSForStatementOrExp(node);
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
