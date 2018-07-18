const nearley = require("nearley");
const grammar = require("./parse.js");


const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar),
    { keepHistory: true }
);

//parser.feed("(<= open (true (cell ?m ?n b)))");
//parser.feed("(<= (legal ?w (mark ?x ?y)) (true (cell ?x ?y b)) (true (control ?w)))");
//parser.feed("(<= (legal xplayer noop) (true (control oplayer)))");
//parser.feed("(<= (goal xplayer 100) (line x))");
//parser.feed("(<= (goal oplayer 50)(not (line x))(not (line o))(not open))");
parser.feed("(<= terminal (not open))");
//parser.feed("(role xplayer)");
//parser.feed("(<= (next (control xplayer))(true (control oplayer)))");  // prueba para rule ambigua
//parser.feed("(<= (line ?x) (row ?m ?x))");
//parser.feed("( init (cell 1 2 b ))");      // prueba para fact funciona bien
// var resultado = parser.results;
// console.log("head: "+(resultado[0].rule).head+''+'\n'+ "tails: "+(resultado[0].rule).tails+ '\n');


console.log("Length P.Results: "+parser.results.length); // p.result.length debe ser 1, si es mayor la gramática es ambigua
console.log("Valor P.Results: "+parser.results[0]);

