const fs = require("fs");
const path = require("path");
const tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");
const generate = require("./generate.js");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const json_compiler = fs.readFileSync(
  path.resolve(__dirname, "./compiler.json"),
  "utf-8"
);

let outputCompiler = JSON.parse(json_compiler);

async function Main({ code }) {
  try {
    let tokens = await tokenizer.token(code);
    let ast = await Parser(code);
    let code_generate = await generate(ast);
    //const output_run = await runCode();
    const compiler = {
      tokens: JSON.stringify(tokens, null, 2),
      ast: JSON.stringify(ast, null, 2),
      code: code_generate,
      //output: output_run,
    };
    outputCompiler = Object.assign(compiler);
    const json_compiler = JSON.stringify(outputCompiler);
    fs.writeFileSync(
      path.resolve(__dirname, "./compiler.json"),
      json_compiler,
      "utf-8"
    );
  } catch (error) {
    const outputError = {
      error: error.message,
    };
    console.log("error main");
    console.log(error.message);
    outputCompiler = Object.assign(outputError);
    const json_compiler = JSON.stringify(outputCompiler);
    fs.writeFileSync(
      path.resolve(__dirname, "./compiler.json"),
      json_compiler,
      "utf-8"
    );
  }
}

async function runCode() {
  const runJs = await exec(`node code.js`);
  if (runJs.stdout) {
    return runJs.stdout;
  }
  if (runJs.stderr) {
    return runJs.stderr;
  }
}

module.exports = {
  main: Main,
  outputCompiler: outputCompiler,
};
