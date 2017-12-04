var konto;
(function($){
	
	$.get('broker.php',params).done(function(response){
		 konto={
		saldo:response.balances[0].booked.amount.content,
		currency: response.balances[0].booked.amount.currency
	}
		$('span.swedbankSaldo').text(konto.saldo + konto.currency);
		$('button.belopp').on('click',function(){
			 saldoOverforing();
		});
			
		raknaTotalSaldo(konto.saldo);
	});
	
	
}(jQuery));

function raknaTotalSaldo(swedbankSaldo){
	var nordea = $('.nordeaSaldo').text().replace('SEK','');
	var nordeaSaldo = parseInt(nordea);
	var totalSaldo = swedbankSaldo + nordeaSaldo;
	$('span.totalSaldo').html(totalSaldo + konto.currency);
}

function raknaNordeaSaldo(){
	var Nordea1 = $('#NordeaSparkonto1').text().replace('SEK','');
	var Nordea1Saldo = parseInt(Nordea1);

	var Nordea2 = $('#NordeaSparkonto2').text().replace('SEK','');
	var Nordea2Saldo = parseInt(Nordea2);

	var totalSaldo = Nordea1Saldo + Nordea2Saldo;

	$('#NordeaSumma').text(totalSaldo + "SEK");
}
function saldoOverforing(){
	var saldo = konto.saldo;
	var swedbankSaldoText = $('span.swedbankSaldo').text();
	var swedbankSaldoPengar = parseInt(swedbankSaldoText);
	var inputText = $('input#usr').text();
	var textBelopp = parseInt(inputText);
	swedbankSaldoText = swedbankSaldoPengar - textBelopp;
	localStorage.setItem('swedbank',swedbankSaldoText);
	$('span.swedbankSaldo').text(swedbankSaldoText + konto.currency);
	
}