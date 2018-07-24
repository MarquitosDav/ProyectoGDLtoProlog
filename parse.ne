
@builtin "number.ne"
@builtin "postprocessors.ne"

@{%

    const moo = require("moo");

    const lexer = moo.compile({
        space: { match: /(?:\s+|;[^\n]*\n?)+/, lineBreaks: true},
        '<=': '<=',
        '(':'(',
        ')':')',
        'atom': /[a-zA-Z]\w*/,
        'num': /[0-9]+/,
        'variable': /\?[a-zA-Z]\w*/,
    });

    var varUpperCase = function(d){

        var string = d+'';
        var res = string.split('?');
        d = res[1].toUpperCase();
        return d;
    }
%}

@lexer lexer

gamedef -> _ clause _ {% ([,c,]) => c %}
        | gamedef clause _ {% ([g,c,]) => g + '\n' + c %} 

clause -> term {% ([t]) => t + "." %} 

term -> "(" _ "role" _ %atom _ ")" {% ([,,,,id,]) => "role(" +id+")" %} 
      | "(" _ "init" _ term _ ")" {% ([,,,,t,]) => "init(" +t+")" %}
      | "(" _ "<=" _ term _ terms _ ")" {% ([,,,,h,,ts,,]) => h+":- "+ts.join(', ') %}
      | "(" _ "next" _ terms _ ")" {% ([,,,,t,,]) => "next(" +t+ ")" %} 
      | "(" _ "cell" _ terms _ ")" {% ([,,,,t,,]) => "cell(" +t+")" %}
      | "(" _ "true" _ terms _ ")" {% ([,,,,t,,]) => "true(" +t+")" %}
      | "(" _ "mark" _ terms _ ")" {% ([,,,,t,,]) => "mark(" +t+")" %}
      | "(" _ "does" _ terms _ ")" {% ([,,,,t,,]) => "does(" +t+")" %}
      | "(" _ "legal" _ terms _ ")" {% ([,,,,t,,]) => "legal(" +t+")" %}
      | "(" _ "control" _ term _ ")" {% ([,,,,t,,]) => "control(" +t+")" %}
      | "(" _ "line" _ terms _ ")" {% ([,,,,t,,]) => "line(" +t+")" %}
      | "(" _ "row" _ terms _ ")" {% ([,,,,t,,]) => "row(" +t+")" %}
      | "(" _ "column" _ terms _ ")" {% ([,,,,t,,]) => "column(" +t+")" %}
      | "(" _ "diagonal" _ terms _ ")" {% ([,,,,t,,]) => "diagonal(" +t+")" %}
      | "(" _ "or" _ terms _ ")" {% ([,,,,ts,,]) => "(" +ts.join('; ') + ")" %}
      | "(" _ "distinct" _ term _ term _ ")" {% ([,,,,t,,s,,]) => t+" \\\\== "+s %}
      | "(" _ "goal" _ terms _ ")" {% ([,,,,t,,]) => "goal(" +t+")" %}
      | "(" _ "not" _ terms _ ")" {% ([,,,,t,,]) => " \\\\+ " +t %}
      | "open" _ term _  {% ([,,t,]) => t %} 
      | "terminal" _ terms _ {% ([,,t,]) => t %}
      | %num  {% id %}
      | %variable {% (d) => (d + '').slice(1).toUpperCase() %}
      | %atom {% id %}


terms -> term {% ([t]) => [t] %}
        | terms _ term {% ([ts,,t]) => ts.concat([t])  %}
_ -> null | %space {% function(d) { return null; } %}


