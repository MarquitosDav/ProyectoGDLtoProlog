
% INICIALIZACIÓN

control(0,xplayer).

cell(0,1,1,b).
cell(0,1,2,b).
cell(0,1,3,b).
cell(0,2,1,b).
cell(0,2,2,b).
cell(0,2,3,b).
cell(0,3,1,b).
cell(0,3,2,b).
cell(0,3,3,b).

cell(State, M, N, x):- S is State - 1, does(S, xplayer, mark(M, N)), cell(S, M, N, b).

cell(State, M, N, o):- S is State - 1, does(S, oplayer, mark(M, N)), cell(S, M, N, b).

cell(State, M, N, W) :- S is State - 1,cell(S, M, N, W), W \== b.


cell(State,M,N,b) :- S is State - 1, does(S, W, mark(J,K)), ( cell(S,M,N,b) ; (M=\=J,N=\=K)).


control(State, xplayer) :- S is State - 1,control(S, oplayer).
control(State, oplayer) :- S is State - 1,control(S, xplayer).


row(State,M,X):- cell(State,M,1,X),cell(State,M,2,X),cell(State,M,3,X).


column(State,N,X):- cell(State,1,N,X),cell(State,2,N,X),cell(State,3,N,X).


diagonal(State,X):- cell(State,1,1,X),cell(State,2,2,X),cell(State,3,3,X).


diagonal(State,X):- cell(State,1,3,X),cell(State,2,2,X),cell(State,3,1,X).


line(State,X):- row(State,M,X).
line(State,X):- column(State,M,X).
line(State,X):- diagonal(State,M,X).

open(State):- cell(State,M,N,b).

legal(State, W, mark(X,Y)) :- cell(State, X, Y, b), control(State, W).


legal(State, xplayer,noop):- control(State,oplayer).

legal(State, oplayer,noop):- control(State,xplayer).


goal(State, xplayer, 100) :- line(State, x).

goal(State, xplayer, 50) :- not(line(State, x)), not(line(State, o)), not(open(State)).

goal(State, xplayer, 0):- line(State,o).

goal(State, oplayer, 100) :- line(State, o).

goal(State, oplayer, 50) :- not(line(State, o)), not(line(State, x)), not(open(State)).

goal(State, oplayer, 0):- line(State,x).


terminal(State):- line(State,x).
terminal(State):- line(State,o).
terminal(State):- not(open(State)).






