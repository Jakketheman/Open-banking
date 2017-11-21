(function($){
	$('div.slideMenu').css('display','none');
	$('div.Navbar').on('click',function(e){
		e.stopPropagation();
		$(this).find('div.slideMenu').slideToggle();
	});
	
}(jQuery));