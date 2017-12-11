(function($){
	
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
		

}(jQuery))


