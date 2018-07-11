const nearley = require("nearley");
const grammar = require("./parse.js");


const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar),
    { keepHistory: true }
);


// parser.feed("(<=(next (cell ?m ?n b)) (does ?w (mark ?j ?k))) (true (cell ?m ?n b)) (or (distinct ?m ?j) (distinct ?n ?k)))");

//parser.feed("(<= (next (cell ?m ?n b)) (does ?w (mark ?j ?k)))");  // prueba para rule
parser.feed("(init (cell 1 1 b))");      // prueba para fact


console.log(parser.results);

console.log("Length P.Results: "+parser.results.length); // p.result.length debe ser 1, si es mayor la gramática es ambigua
console.log("Valor P.Results: "+parser.results[0]);

