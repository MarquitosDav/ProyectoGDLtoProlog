var pl = require('./tau-prolog');

/** Constructor de la clase GDLGame.
*/
function GDLGame(source, facts) {
	this.__session__ = pl.create();
	this.__source__ = source;
	this.__session__.consult(source);   // ver si está bien esto, si no es lo que pone repetidos
	this.__session__.consult(facts || this.initFacts());
}
exports.GDLGame = GDLGame;

GDLGame.prototype.initFacts = function initFacts() {
	
	return this.__session__.allAnswers('init(X).').map(function (s) {
		return 'true('+ s.links.X +').';
	}).join('\n');
};

/**
*/
GDLGame.prototype.activePlayer = function activePlayer(){
	var answers = this.__session__.allAnswers('true(control(X)).');
	return answers[0].links.X +'';
};

/**
*/
GDLGame.prototype.moves = function moves() {
	var answers = this.__session__.allAnswers('legal(P, M), true(control(P)).'),
		result = {},
		ans, moves;
	if (answers.length < 1) {
		return null;
	} else for (var i = 0; i < answers.length; i++) {
		ans = answers[i];
		
		moves = result[ans.links.P +''];
		
		if (!moves) {
			moves = [];
			result[ans.links.P +''] = moves;
		}
		moves.push(ans.links.M +'');
		
	}
	console.log(moves);
	return result;
};

GDLGame.prototype.result = function result() {   // PARA QUE FUNCIONE EL GOAL TENGO QUE MODIFICAR LOS TRUE
	var answers = this.__session__.allAnswers('goal(P, R).'),
		result = {},
		ans;
	if (answers.length < 1) {
		return null;
	} else for (var i = 0; i < answers.length; i++) {
		ans = answers[i];
		result[ans.links.P +''] = ans.links.R;
	}
	return result;
};

/**
*/
GDLGame.prototype.next = function next(moves) {
	var s2 = new pl.create();
	s2.copy_context(this.__session__);
	for (var p in moves) {
		s2.consult('does('+ p +','+ moves[p] +').');
	}
	var nextfactsAux = s2.allAnswers('next(X).');
	//console.log(nextfactsAux.join('\n'));
/*
	s2.allAnswers('true(X).').forEach(function (t) {
		s2.answer('retract(true('+ t.links.X +')).');
	});
	s2.allAnswers('does(P, M).').forEach(function (t) {
		s2.answer('retract(does('+ t.links.P +','+ t.links.M +')).');
	});
	nextfactsAux.forEach(function (t) {
		s2.consult('true('+ t.links.X +').');
	});

		var str = moves[p];     //  fixme ver esto con leo para eliminar los true que ya no son true con blanco
	    var res = str.split("("); 
	    var str2 = res[1].split(")");
	    var res = str2[0].split(",",2);
	    var toDelete = "true(cell("+res[0]+','+res[1]+",b))";
	    
		var result = s2.allAnswers('retract('+toDelete+').');
		var player;
		if(p == 'xplayer'){
			player = 'x';
		} else{
			player = 'o';
		}

	    var toPut = "true(cell("+res[0]+','+res[1]+","+player+")).";
	    s2.consult(toPut);
	    
	    
	    // if(player == 'x'){     // esto cambia el control
	    // 	console.log('entra al if');
	    // 	var result = s2.allAnswers('retract(true(control(xplayer))).');
	    // 	s2.consult('true(control(oplayer)).');
	    // }else{
	    // 	console.log('entra al else');
	    // 	var result = s2.allAnswers('retract(true(control(oplayer))).');
	    // 	s2.consult('true(control(xplayer)).');
	    // }
	    

	    var result = s2.allAnswers('true(X).');
	    
	}

	// elimino repetidos
	var nextfactsAux = s2.allAnswers('next(X).');
	  // fixme
*/	var newarr = [];
    var newarr2 = [];
	for (var i=0; i<nextfactsAux.length; i++) {

	   var aux = nextfactsAux[i].toString();
	   
	   if (newarr.indexOf(aux)== -1) {
	   	newarr.push(aux);
	   	newarr2.push(nextfactsAux[i]);   // fixme como evitar esto si se puede 
		}
	}
	// fin elimino repetidos

	var nextFacts = newarr2.map(function (a) {
			return 'true('+ a.links.X +').';
		}).join('\n');

		console.log('nextfacts : '+'\n'+nextFacts+''); // fixme
		var nextState = new this.constructor(this.__source__, nextFacts);
	return nextState;
};

exports.GDL_TICTACTOE = new GDLGame(`
	:- dynamic(true/1).

	init(cell(1,1,b)).
	init(cell(1,2,b)).
	init(cell(1,3,b)).
	init(cell(2,1,b)).
	init(cell(2,2,b)).
	init(cell(2,3,b)).
	init(cell(3,1,b)).
	init(cell(3,2,b)).
	init(cell(3,3,b)).
	init(control(xplayer)).
	
	legal(W, mark(M,N)) :- true(cell(M, N, b)), true(control(W)).
	legal(xplayer,noop) :- true(control(oplayer)).
	legal(oplayer,noop) :- true(control(xplayer)).
	
	row(M,X):- true(cell(M,1,X)),true(cell(M,2,X)),true(cell(M,3,X)).
	column(N,X):- true(cell(1,N,X)),true(cell(2,N,X)),true(cell(3,N,X)).
	diagonal(X):- true(cell(1,1,X)),true(cell(2,2,X)),true(cell(3,3,X)).
	diagonal(X):- true(cell(1,3,X)),true(cell(2,2,X)),true(cell(3,1,X)).
	line(X):- row(M,X).  
	line(X):- column(M,X).
	line(X):- diagonal(X).

	next(cell(M,N,x)) :- does(xplayer,mark(M,N)),true(cell(M,N,b)).
	next(cell(M,N,o)) :- does(oplayer,mark(M,N)),true(cell(M,N,b)).
	next(cell(M,N,W)) :- true(cell(M,N,W)), (W \\== b). 
	next(cell(M,N,b)) :- does(W, mark(J,K)), true(cell(M,N,b)), (M \\== J ; N \\== K).
	next(control(xplayer)):- true(control(oplayer)).
	next(control(oplayer)):- true(control(xplayer)).
	
	open :- true(cell(M,N,b)).
	goal(xplayer, 100) :- line(x).
	goal(xplayer, 50) :- \\+ line(x), \\+ line(o), \\+ open.
	goal(xplayer, 0) :- line(o).
	goal(oplayer,100) :- line(o).
	goal(oplayer,50) :- \\+ line(x), \\+ line(o), \\+ open.
	goal(oplayer,0) :- line(x).
	
	terminal :- line(x).
	terminal :- line(o).
	terminal :- \\+ open.
`);
