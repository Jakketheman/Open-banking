(function($){
	$.get('broker.php',params).done(function(response){
		$('h2.swedbankSaldo').html(response.balances[0].booked.amount.content + response.balances[0].booked.amount.currency);
	});
}(jQuery));