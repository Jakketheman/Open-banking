var konto;
(function($){
	
	$.get('broker.php',params).done(function(response){
		 konto={
		saldo:response.balances[0].booked.amount.content,
		currency: response.balances[0].booked.amount.currency
	}
		$('span.swedbankSaldo').html(konto.saldo + konto.currency);
		raknaTotalSaldo(konto.saldo);
	});
	
	
}(jQuery));

function raknaTotalSaldo(swedbankSaldo){
	var nordea = $('.nordeaSaldo').text().replace('SEK','');
	var nordeaSaldo = parseInt(nordea);
	var totalSaldo = swedbankSaldo + nordeaSaldo;
	$('span.totalSaldo').html(totalSaldo + konto.currency);
}