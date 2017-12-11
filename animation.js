(function($){
	//animation
	$('div.slideMenu').css('display','none');
		
	$(document).on('click','div.Navbar',function(e){
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
	$('ul.kontoFran li').on('click',function(){
		$(this).toggleClass('activeKonto');
	});
	$('div.body').css('width',$('div.container').width()-$('nav#nav').width()-'230');
	overfora();
}(jQuery));

function overfora(){
	 $("#tableMenu a").click(function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton").text(selText);
	});
	$("#tableMenu1 a").click(function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton1").text(selText);
	});   
	$("#tableMenu2 a").click(function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton2").text(selText);
	}); 
	$("#tableMenu3 a").click(function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton3").text(selText);
	});
}