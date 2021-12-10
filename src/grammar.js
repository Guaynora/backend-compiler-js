// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const myLexer = require("./tokenizer.js")
    const myLex = myLexer.lexer
var grammar = {
    Lexer: myLex,
    ParserRules: [
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data) => {
            return [data[0]]
        }
                },
    {"name": "statements", "symbols": ["statements", (myLex.has("NL") ? {type: "NL"} : NL), "statement"], "postprocess": 
        (data) => {
            return [...data[0], data[2]]
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "var_assign", "symbols": [(myLex.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data) => {
            return{
                type: "var_assign",
                var_name: data[0],
                value: data[4] 
            }
        }
                },
    {"name": "fun_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_"]},
    {"name": "fun_call$ebnf$1", "symbols": ["fun_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_call", "symbols": [(myLex.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "fun_call$ebnf$1", {"literal":")"}], "postprocess": 
        (data) => {
            return{
                type: "fun_call",
                fun_name: data[0],
                arguments: data[4] ? data[4][0] : []
            }
        }
                },
    {"name": "while_loop", "symbols": [{"literal":"while"}, "_", "binary_expression", "_", {"literal":"{"}, "_", (myLex.has("NL") ? {type: "NL"} : NL), "_", "statements", (myLex.has("NL") ? {type: "NL"} : NL), {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "while_loop",
                condition: data[2],
                body: data[8]
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]]
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]]
        }
                },
    {"name": "expr", "symbols": [(myLex.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": ["fun_call"], "postprocess": id},
    {"name": "expr", "symbols": ["binary_expression"], "postprocess": id},
    {"name": "expr", "symbols": [(myLex.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLex.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "binary_expression", "symbols": ["expr", "_", "operator", "_", "expr"], "postprocess": 
        data => {
            return{
                type: "binary_expression",
                left: data[0],
                operator: data[2],
                right: data[4]
            }
        }
                },
    {"name": "operator", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"<="}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":">="}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"=="}], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLex.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLex.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLex.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
