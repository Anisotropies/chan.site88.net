//Chapter 2

//Looping a triangle
for(var i = 1; i<=7;i++)
{
	var word = "";
	for(var j = i; j>0; j--)
	{
		word = word + "#";
	}
  console.log(word);
}


//FizzBuzz
for (var i = 1; i<=100; i++)
{
	if(!(i%3))
	{
		if(!(i%5))
		{
			console.log("FizzBuzz");
		}
		else
		{
			console.log("Fizz");
		}
	}
	if(!(i%5))
	{
		console.log("Buzz");
	}
	else
	{
		console.log(i);
	}
}


//Chessboard
var size = 8;
for (var rowNum = 0; rowNum<size; rowNum++)
{
  var rowDisplay = "";
	for(var colNum = 0; colNum < size; colNum++)
    {
      if(rowNum%2)
      {
        if(colNum%2)
        	rowDisplay += " ";
        else
        	rowDisplay += "#";
      }
      else
      {
        if(colNum%2)
        	rowDisplay += "#";
        else
        	rowDisplay += " ";
      }
    }
	console.log(rowDisplay);
}

