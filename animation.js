(function($){
	//animation
	$('div.slideMenu').css('display','none');
	$('div.Navbar').on('click',function(e){
		e.stopPropagation();
		$(this).find('div.slideMenu').slideToggle();
	});
	$('div.barButton').on('click',function(e){
		$('#nav').toggleClass('active');
		$(this).toggleClass('change');
		$('div.body').toggleClass('atCenter');
		$('div.sideMenuBar').toggleClass('hiddenBar');
	});
	
	
	$('div.barButton').css('height',$('header').height());
}(jQuery));