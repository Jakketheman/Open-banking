(function($){
	transaktion();
}(jQuery));
function transaktion(){
	var textbox = $('div.scrollabletextbox');
	if($('table').find('td.transaktioner').length==0){
		$.get('Transaktioner.php',params).done(function(response){
			for(var i=0;i<=1;i++){
				var $tableRow =$('<tr>');
				var transaktionerTD = '<td class="transaktioner">'+response.transactions.booked[i].amount.content + '</td><td class="valuta">' + response.transactions.booked[i].amount.currency+'</td>';
				transaktionerTD += '<td class="dataFran">' + response.transactions.booked[i].transaction_date + '</td><td class="dataTill">' + response.transactions.booked[i].value_date+'</td>';
				$tableRow.append(transaktionerTD);
				$('table').append($tableRow);
			}
			
		});
	}
		nyTransaktion();
}

function nyTransaktion(){
	if(localStorage.getItem('belopp')!==null){
		var transaktionTD ='<tr><td class="transaktioner"'+localStorage.getItem('saldo')+'</td><td class="valuta">'+'SEK';
		transaktionTD += '</td><td class="dataFran">idag</td><td class="dataTill">idag</td>';
		$('table').prepend(transaktionTD);
		console.log(localStorage.getItem('belopp')+'hello');
	}
}