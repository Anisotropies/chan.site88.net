function forEach(array, action)
{
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}

function greaterThan(n)
{
	return function(m){return m>n;};
}

function unless ( test , then ) {
if (! test ) then () ;
}
function repeat ( times , body ) {
for ( var i = 0; i < times ; i ++) body ( i ) ;
}
repeat (3 , function ( n ) {
unless ( n % 2 , function () {
console . log (n , " is even ") ;
}) ;
}) ;