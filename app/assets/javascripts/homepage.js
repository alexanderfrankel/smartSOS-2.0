function animateHomepage() {
	// $('#nav').hide().delay(1000).fadeIn(500);
	// $('#nav').css({opacity: 0.0, visibility: "visible"}).delay(1000).css({opacity: 1.0, visibility: "visible"});
	$('#quote').hide().fadeIn(2000);
}

	var scrollY = 0;
	var distance = 40;
	var speed = 24;

function autoScrollTo(el) {
		var currentY = window.pageYOffset;
		// var targetY = document.getElementById(el).offsetTop;
		var targetY = $(el).offsetTop;
		var bodyHeight = document.body.offsetHeight;
		var yPos = currentY + window.innerHeight;
		var animator = setTimeout('autoScrollTo(\' '+el+' \')', speed);

		if (yPos > bodyHeight){
			clearTimeout(animator);
		} else {
			if (currentY < targetY - distance) {
				scrollY = currentY + distance;
				window.scroll(0, scrollY);
			} else {
				clearTimeout(animator);
			}
		}
			
}


