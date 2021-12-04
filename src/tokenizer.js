const moo = require("moo");

let lexer = moo.compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  number: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  fatarrow: "=>",
  assign: "=",
  NL: { match: /\n/, lineBreaks: true },
});

async function Token(code) {
  lexer.reset(code);
  const tokens = [];
  while (true) {
    const token = await lexer.next();
    if (!token) {
      break;
    }
    tokens.push(token);
  }
  return tokens;
}

module.exports = {
  lexer: lexer,
  token: Token,
};
