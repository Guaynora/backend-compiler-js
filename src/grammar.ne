@{%
    const myLexer = require("./tokenizer.js")
    const myLex = myLexer.lexer
%}

@lexer myLex

statements
    -> statement
        {%
            (data) => {
                return [data[0]]
            }
        %}
    | statements %NL statement
        {%
            (data) => {
                return [...data[0], data[2]]
            }
        %}

statement
    -> var_assign   {% id %}
    | fun_call      {% id %}
    | while_loop    {% id %}

var_assign
    ->%identifier _ "=" _ expr
        {%
            (data) => {
                return{
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4] 
                }
            }
        %}

fun_call
    -> %identifier _ "(" _ (arg_list _):? ")"
        {%
            (data) => {
                return{
                    type: "fun_call",
                    fun_name: data[0],
                    arguments: data[4] ? data[4][0] : []
                }
            }
        %}

while_loop
    -> "while" _ binary_expression _ "{" _ %NL _ statements %NL "}"
        {%
            (data) => {
                return {
                    type: "while_loop",
                    condition: data[2],
                    body: data[8]
                }
            }
        %}

arg_list
    ->expr
        {%
            (data) => {
                return [data[0]]
            }
        %}
    | arg_list __ expr
        {%
            (data) => {
                return [...data[0], data[2]]
            }
        %}
    
expr
    -> %string      {% id %}
    | fun_call      {% id %}
    |binary_expression  {% id %}
    | %number       {% id %}
    | %identifier   {% id %}

binary_expression
    -> expr _ operator _ expr 
        {%
            data => {
                return{
                    type: "binary_expression",
                    left: data[0],
                    operator: data[2],
                    right: data[4]
                }
            }
        %}

operator 
    -> "+"  {%id%}
    |  "-"  {%id%}
    |  "*"  {%id%}
    |  "/"  {%id%}
    |  "<"  {%id%}
    |  ">"  {%id%}
    |  "<="  {%id%}
    |  ">="  {%id%}
    |  "=="  {%id%}

_ -> %WS:*

__ ->%WS:+