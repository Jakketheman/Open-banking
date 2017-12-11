//Version1.html
//localStorage kan användas för att spara olika kontouppgifter, men localStorage har tre stora problem
//Första är localStorage har ingen cross-browser förmåga
//Andra är localStorage value sparas i browser. Det betyder om användare loggar in från annan dator, alla uppdateringarna ska bli nya

var konto;
var nordeaKonto;

	/*localStorage.removeItem('belopp');
	localStorage.removeItem('saldo');
*/
(function($){
	
	RaknaSaldo();
	Payments();
	$('div.sideMenuBar a').on('click',function(e){
		var href = $(this).attr('href');
		if(href !=='Transaktioner.html')
			e.preventDefault();
		if(href=='Version1.html')
			$('div.body').load(href +' #main' ,RaknaSaldo);
		else (href=='Overforing.html')
			$('div.body').load(href +' #main');
		history.pushState(null,null,href);
		console.log('active page '+href);
	});
	window.onpopstate = function(){
		var URL = window.location.pathname;
		var filename = URL.substring(URL.lastIndexOf('/')+1);
		if(filename == 'Version1.html'){
			$('div.body').load(filename + ' #main' ,RaknaSaldo);
		} else if(filename == 'Overforing.html'){
			$('div.body').load(filename + '#main');
		} else
			window.location.href= 'Transaktioner.html';
	};
	$(document).on('click','button.belopp',function(){//knapp från Överföring.html 
		var belopp = $('input#usr').val();
		var nordeaSaldo = raknaNordeaSaldo();
		console.log(konto.saldo);
		//if($('ul.kontoFran li.activeKonto a').text()=='Swedbank'){
			$.ajax({
				url:'Version1.html',
				beforeSend:function(xhr){
					if($('ul.kontoFran li.activeKonto a').text()=='Swedbank'&&belopp>konto.saldo){
						alert('Du har inte så mycket pengar. Du har:' + konto.saldo + ' SEK ');
						xhr.abort();
					} else if($('ul.kontoFran li.activeKonto a').text()=='Nordea'&&belopp>nordeaSaldo){
						alert('Du har inte så mycket pengar. Du har: ' + nordeaSaldo + ' SEK ');
						xhr.abort();
					}
				},
				success:function(){
					var nySaldo = konto.saldo-belopp;
					$('span.swedbankSaldo').text(nySaldo);
					/*if(window.localStorage){	
						localStorage.setItem('saldo',nySaldo);
						localStorage.setItem('belopp',belopp);
					}*/RaknaSaldo();
					$('div.body').load('Version1.html'+ ' #main > *');
					history.pushState(null,null,'Version1.html');
					
				}
			});
		//} 
		
	});
}(jQuery));
function raknaTotalSaldo(swedbankSaldo){
	var nordeaSaldo = raknaNordeaSaldo();
	totalSaldo = nordeaSaldo + swedbankSaldo;
	$('span.totalSaldo').text(totalSaldo + konto.currency);
}

function raknaNordeaSaldo(){
	$('#NordeaSparkonto1').text('50000SEK');
	$('#NordeaSparkonto2').text('2000SEK');
	var Nordea1 = $('#NordeaSparkonto1').text().replace('SEK','');
	var Nordea1Saldo = parseInt(Nordea1);

	var Nordea2 = $('#NordeaSparkonto2').text().replace('SEK','');
	var Nordea2Saldo = parseInt(Nordea2);

	var totalSaldo = Nordea1Saldo + Nordea2Saldo;

	$('#NordeaSumma').text(totalSaldo + "SEK");
	return totalSaldo;

}
function RaknaSaldo(){
	params.type = "accounts";
	$.get('broker.php',params).done(function(response){
		 konto={
			saldo:response.balances[0].booked.amount.content,
			currency: response.balances[0].booked.amount.currency
		}
		if(localStorage.getItem('saldo') == undefined){
			$('span.swedbankSaldo').text(konto.saldo + konto.currency);
			raknaTotalSaldo(konto.saldo);
		}
		/*else{
			konto.saldo = localStorage.getItem('saldo');
			var kontoSaldo = parseInt(konto.saldo);
			console.log(typeof kontoSaldo);
			console.log('konto: '+konto.saldo +' value '+localStorage.getItem('saldo'));
			$('span.swedbankSaldo').text(kontoSaldo + konto.currency);
			raknaTotalSaldo(kontoSaldo);
		}*/
		
	});
}

function Payments(){
	params.type = "payments";
	$.get('broker.php',params).done(function(response){
		 console.log(response + 'Hello');
		
	});
}

