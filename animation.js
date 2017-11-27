(function($){
	//animation
	$('div.slideMenu').css('display','none');
	$('div.Navbar').on('click',function(e){
		e.stopPropagation();
		$(this).find('div.slideMenu').slideToggle();
	});
	$('div.barButton').on('click',function(e){
		$(this).toggleClass('change');
		$('div.sideMenuBar').toggleClass('hiddenBar');
		
	});
	
	$('div.sideMenuBar').css({
		'height':$('body').height(),
		'width':$('div.barButton').outerWidth()
	});
	$('div.barButton').css('height',$('header').height());
}(jQuery));