//Version1.html
var konto;
localStorage.removeItem('belopp');
localStorage.removeItem('saldo');
(function($){
	
	RaknaSaldo();
	
	$('div.sideMenuBar a').on('click',function(e){
		var href = $(this).attr('href');
		if(href !=='Transaktioner.html')
			e.preventDefault();
		if(href=='Version1.html')
			$('div.body').load(href +' #main' ,RaknaSaldo);
		else (href=='Överföring.html')
			$('div.body').load(href +' #main');
		history.pushState(null,null,href);
		console.log('previous page '+history.length);
	});
	
	$(document).on('click','button.belopp',function(){//knapp från Överföring.html 
		var belopp = $('input#usr').val();
		console.log(konto.saldo);
		$.ajax({
			url:'Version1.html',
			beforeSend:function(xhr){
				if(belopp<=konto.saldo){
					alert('You don\'t have enough money');
					xhr.abort();
				}
			},
			success:function(){
				var nySaldo = konto.saldo-belopp;
				$('span.swedbankSaldo').text(nySaldo);
				if(window.localStorage){	
					localStorage.setItem('saldo',nySaldo);
					localStorage.setItem('belopp',belopp);
				}$('div.body').load('Version1.html'+ ' #main');
			}
		});
		
	});
}(jQuery));
function raknaTotalSaldo(swedbankSaldo){
	var nordeaSaldo = raknaNordeaSaldo();
	totalSaldo = nordeaSaldo + konto.saldo;
	$('span.totalSaldo').html(totalSaldo + konto.currency);
}

function raknaNordeaSaldo(){
	var Nordea1 = $('#NordeaSparkonto1').text().replace('SEK','');
	var Nordea1Saldo = parseInt(Nordea1);

	var Nordea2 = $('#NordeaSparkonto2').text().replace('SEK','');
	var Nordea2Saldo = parseInt(Nordea2);

	var totalSaldo = Nordea1Saldo + Nordea2Saldo;

	$('#NordeaSumma').text(totalSaldo + "SEK");
	return totalSaldo;
}
function RaknaSaldo(){
	$.get('broker.php',params).done(function(response){
		 konto={
			saldo:response.balances[0].booked.amount.content,
			currency: response.balances[0].booked.amount.currency
		}
		if(localStorage.getItem('saldo') == undefined)
			$('span.swedbankSaldo').text(konto.saldo + konto.currency);
		else{
			konto.saldo == localStorage.getItem('saldo');
			$('span.swedbankSaldo').text(konto.saldo + konto.currency);
		}
		raknaTotalSaldo(konto.saldo);
	});
}

