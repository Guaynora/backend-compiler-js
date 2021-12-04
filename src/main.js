const fs = require("fs");
const path = require("path");
const tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");
const generate = require("./generate.js");

const json_compiler = fs.readFileSync(
  path.resolve(__dirname, "./compiler.json"),
  "utf-8"
);

let outputCompiler = JSON.parse(json_compiler);

async function Main({ code }) {
  let tokens = await tokenizer.token(code);
  let ast = await Parser(code);
  const compiler = {
    tokens: JSON.stringify(tokens),
    ast: JSON.stringify(ast),
  };
  //const compilerEnd = compiler.replace(/\\n/g, "");
  //console.log(compilerEnd);
  outputCompiler = Object.assign(compiler);
  const json_compiler = JSON.stringify(outputCompiler);
  fs.writeFileSync(
    path.resolve(__dirname, "./compiler.json"),
    json_compiler,
    "utf-8"
  );
}

async function runCode() {
  await myExec(`node code.js`);
}

async function myExec(command) {
  const output = await exec(command);
  if (output.stdout) {
    console.log(output.stdout);
  }
  if (output.stderr) {
    console.log(output.stderr);
  }
}

module.exports = {
  main: Main,
  outputCompiler: outputCompiler,
};
