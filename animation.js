(function($){
	//animation
	$('div.body').css('height',$(document).height());
	var URL = window.location.pathname;
		var filename = URL.substring(URL.lastIndexOf('/')+1);
	$('div.sideMenuBar ul.links a').on('click',function(e){
		var href = $(this).attr('href');
		if(filename !== 'Transaktioner.html'){
			if(href !=='Transaktioner.html')
				e.preventDefault();
			if(href=='Version1.html')
				$('div.body').load(href +' #main > *' ,RaknaSaldo);
			else (href=='Overforing.html')
				$('div.body').load(href +' #main > *');
		}else{
			window.location.href = href;
		}
		//Lägga url till history
		history.pushState(null,null,href);
		console.log('active page '+href);
	});
	window.onpopstate = function(){
		if(filename == 'Version1.html'){
			$('div.body').load(filename + ' #main > *' ,RaknaSaldo);
		} else if(filename == 'Overforing.html'){
			$('div.body').load(filename + ' #main > *');
		} else
			window.location.href= 'Transaktioner.html';
	};
	//event på document eftersom div.Navbar kan laddas från annan HTML med JQuery load()
	$(document).on('click','div.Navbar',function(e){
		e.stopPropagation();
		$(this).find('div.slideMenu').slideToggle();
	});
	//När man trycker på knappen
	//inte på document eftersom sidnavbar ska sitta alltid 
	$('div.barButton').on('click',function(e){
		$('#nav').toggleClass('active');
		$(this).toggleClass('change');
		$('div.body').toggleClass('atCenter');
		$('div.sideMenuBar').toggleClass('hiddenBar');
	});
	
	$('div.barButton').css('height',$('header').height());
	$(document).on('click','div.dropdown ul',function(){
		aktiveraOverforing();
	});
	$(document).on('click','div.KnappLeft ul.kontoFran li, div.KnappLeft ul.kontoTill li',function(event){
		if($(this).closest('ul').hasClass('kontoFran'))	
			$('div.KnappLeft ul.kontoFran li').removeClass('activeBank');
		else
			$('div.KnappLeft ul.kontoTill li').removeClass('activeBank');
		$(this).toggleClass('activeBank');
	});
	$(document).on('click','div.KnappRight ul.kontoTyp li, div.KnappRight ul.kontoTyp li',function(event){
		if($(this).closest('ul').hasClass('firstKonto'))	
			$('div.KnappRight ul.firstKonto.kontoTyp li').removeClass('activeKonto');
		else
			$('div.KnappRight ul.secondKonto.kontoTyp li').removeClass('activeKonto');
		$(this).toggleClass('activeKonto');
	});
	
	transferSetting();

}(jQuery));

function transferSetting(){
	$(document).on('click','#tableMenu a',function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton").text(selText);
	});
	$(document).on('click','#tableMenu1 a',function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton1").text(selText);
	});   
	$(document).on('click','#tableMenu2 a',function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton2").text(selText);
	}); 
	$(document).on('click','#tableMenu3 a',function(e){
		e.preventDefault(); // cancel the link behaviour
		var selText = $(this).text();
		$("#tableButton3").text(selText);
	});
}

function aktiveraOverforing(){
	var allSelected;
	var activeBank = $('div.KnappLeft ul').children('li.activeBank').length;
	console.log(activeBank);
	var activeKonto = $('div.KnappRight ul').children('li.activeKonto').length;
	if(activeBank&&activeKonto == 2){
		allSelected = true;
	}else
		allSelected = false;
	if(allSelected){
		$('button.belopp').toggleClass('disabled');
	} else if(!allSelected && !$('button.belopp').hasClass('disabled'))
		$('button.belopp').toggleClass('disabled');
}