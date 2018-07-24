// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

function nth(n) {
    return function(d) {
        return d[n];
    };
}


function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}



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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "gamedef", "symbols": ["_", "clause", "_"], "postprocess": ([,c,]) => c},
    {"name": "gamedef", "symbols": ["gamedef", "clause", "_"], "postprocess": ([g,c,]) => g + '\n' + c},
    {"name": "clause", "symbols": ["term"], "postprocess": ([t]) => t + "."},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"role"}, "_", (lexer.has("atom") ? {type: "atom"} : atom), "_", {"literal":")"}], "postprocess": ([,,,,id,]) => "role(" +id+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"init"}, "_", "term", "_", {"literal":")"}], "postprocess": ([,,,,t,]) => "init(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"<="}, "_", "term", "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,h,,ts,,]) => h+":- "+ts.join(', ')},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"next"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "next(" +t+ ")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"cell"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "cell(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"true"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "true(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"mark"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "mark(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"does"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "does(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"legal"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "legal(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"control"}, "_", "term", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "control(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"line"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "line(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"row"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "row(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"column"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "column(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"diagonal"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "diagonal(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"or"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,ts,,]) => "(" +ts.join('; ') + ")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"distinct"}, "_", "term", "_", "term", "_", {"literal":")"}], "postprocess": ([,,,,t,,s,,]) => t+" \\\\== "+s},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"goal"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => "goal(" +t+")"},
    {"name": "term", "symbols": [{"literal":"("}, "_", {"literal":"not"}, "_", "terms", "_", {"literal":")"}], "postprocess": ([,,,,t,,]) => " \\\\+ " +t},
    {"name": "term", "symbols": [{"literal":"open"}, "_", "term", "_"], "postprocess": ([,,t,]) => t},
    {"name": "term", "symbols": [{"literal":"terminal"}, "_", "terms", "_"], "postprocess": ([,,t,]) => t},
    {"name": "term", "symbols": [(lexer.has("num") ? {type: "num"} : num)], "postprocess": id},
    {"name": "term", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": (d) => (d + '').slice(1).toUpperCase()},
    {"name": "term", "symbols": [(lexer.has("atom") ? {type: "atom"} : atom)], "postprocess": id},
    {"name": "terms", "symbols": ["term"], "postprocess": ([t]) => [t]},
    {"name": "terms", "symbols": ["terms", "_", "term"], "postprocess": ([ts,,t]) => ts.concat([t])},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": function(d) { return null; }}
]
  , ParserStart: "gamedef"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
