const nearley = require("nearley");
const grammar = require("./parse.js");


const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar),
    { keepHistory: true }
);

parser.feed(`
	(<= open (true (cell ?m ?n b)))
	(<= (legal ?w (mark ?x ?y)) (true (cell ?x ?y b)) (true (control ?w)))
	(<= (legal xplayer noop) (true (control oplayer)))
	(<= (goal xplayer 100) (line x))
	(<= (goal oplayer 50)(not (line x))(not (line o))(not open))
	(<= terminal (not open))
	(role xplayer)
	(<= (next (control xplayer))(true (control oplayer))) 
	(<= (line ?x) (row ?m ?x))
	( init (cell 1 2 b ))   
	(<= (next (cell ?m ?n b)) (does ?w (mark ?j ?k))(true (cell ?m ?n b))(or (distinct ?m ?j) (distinct ?n ?k)))
	`);


console.log("Length P.Results: "+parser.results.length); // p.result.length debe ser 1, si es mayor la gramática es ambigua
console.log("Valor P.Results: "+parser.results[0]);

