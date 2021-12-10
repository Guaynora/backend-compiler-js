const nearley = require("nearley");
const grammar = require("./grammar.js");

async function Parser(code) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(code);
  try {
    if (parser.results.length > 1) {
      console.log("Error: ambigous grammar detected");
    } else if (parser.results.length == 1) {
      const ast = await parser.results[0];
      //console.log(ast);
      return ast;
    }
  } catch (e) {
    console.log("error parser");
    console.log(e.message);
  }
}

module.exports = Parser;
