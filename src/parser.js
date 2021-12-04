const nearley = require("nearley");
const grammar = require("./grammar.js");

async function Parser(code) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(code);
  if (parser.results.length > 1) {
    console.log("Error: ambigous grammar detected");
  } else if (parser.results.length == 1) {
    const ast = await parser.results[0];
    //console.log(ast);
    return ast;
  } else {
    console.log("Error: no parse found");
  }
}

module.exports = Parser;
