//Recursion

// Your code here.
var isEven = function(num)
{
  //base case
  if(num == 0)
    return "true";
  else if(num == 1)
    return "false";
  else if(num < 0)
    return "Input number cannot be negative!";
  else
    return isEven(num-2);
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

//

function countChar(stringW, ch) {
  var counted = 0;
  for (var i = 0; i < stringW.length; i++)
    if (stringW.charAt(i) == ch)
      counted += 1;
  return counted;
}

function countBs(string) {
  return countChar(string, "B");
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4