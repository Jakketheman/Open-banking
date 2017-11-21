(function($){
	$('div.slideMenu').css('display','none');
	$('div.Navbar').on('click',function(){
		$(this).next('div').slideToggle();
	});
	
}(jQuery));