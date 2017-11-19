$(document).ready(function() {

	$('#meltStar').hover(function() {
		$(this).fadeOut(500);
		$(this).fadeIn(500);
	});
	
	 $( "#meltStar" ).animate({
    opacity: 0.25,
    left: "+=50",
    height: "toggle"
  }, 5000, function() {
    // Animation complete.
  });
  
});