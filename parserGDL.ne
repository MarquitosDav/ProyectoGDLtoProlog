@builtin "whitespace.ne"
@builtin "number.ne"
@builtin "postprocessors.ne"

@{%


	var procesar = function(param){
 		
 		return param;
	}
	var concatWord = function(d){
		
		return d+'';
	}
%}


main -> "(<=" _ rule _ ")" {% function(d){ return { "rule": d[2] }}%} 
		| "(" _ fact _ ")" {% function(d){ return { "fact": d[2] }}%} 

fact -> literal {%    function(d) {
									return d+''
						       }
			  %}

rule -> "(" _ literal _ ")" _ "(" _ literal  {%    function(d) {
									return { "head": d[2], "tails":d[8] }
						       }
			  %}

head -> "(" _ literal _ ")" {%  ([,,dos,,]) => (procesar(dos)) %}


literal -> [^\n\r]:* {% concatWord %}


#  rule    (<=(next (cell ?m ?n b)) (does ?w (mark ?j ?k)))
#  fact    (init (cell 1 1 b))
