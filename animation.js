(function($){
	$('div.Navbar').on('click',function(){
		$(this).next('div').slideToggle();
	});
}(jQuery));