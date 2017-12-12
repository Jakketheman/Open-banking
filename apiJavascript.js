//Version1.html
//localStorage kan användas för att spara olika kontouppgifter, men localStorage har tre stora problem
//Första är localStorage har ingen cross-browser förmåga
//Andra är localStorage value sparas i browser. Det betyder om användare loggar in från annan dator, alla uppdateringarna ska bli nya

var konto;
var nordeaKonto;
var nordeaSparkonto = 50000;
var nordeaFondkonto =2000;
	/*localStorage.removeItem('belopp');
	localStorage.removeItem('saldo');
*/
(function($){
	
	RaknaSaldo();
	Payments();
	//När man trycker på länken i sidnavbar
	$(document).on('click','button.belopp',function(){//knapp från Overforing.html 
		var belopp = $('input#usr').val();
		//göra ajax anrop om knappen har inte klass disabled
		//det kan ta lång tid att undersöka konto från API i stora appar därför har vi lagt ajax eftersom den är asynkroniserad
		if(!$(this).hasClass('disabled')){
			$.ajax({
				url:'Version1.html',
				beforeSend:function(xhr){
					if(!overfora(belopp)){
						xhr.abort();
					}
				},//om ajax anropen lyckades
				success:function(){
					var nySaldo;
					/*if(window.localStorage){	
						localStorage.setItem('saldo',nySaldo);
						localStorage.setItem('belopp',belopp);
					}*/
					if($('ul.kontoFran li.activeBank a').text()=='Swedbank'){
						$('div.body').load('Version1.html'+ ' #main > *',function(){
							nySaldo = konto.saldo-belopp;
						   $('span.swedbankSaldo').text(nySaldo+'SEK');
						   raknaTotalSaldo(nySaldo,nordeaSparkonto,nordeafondKonto);
						});
					}
					else{
						$('div.body').load('Version1.html' +' #main > *',function(){
							if($('ul.firstKonto.kontoTyp li.activeKonto a').text()=='Sparkonto'){
								nySaldo = nordeaSparkonto-belopp;
								raknaTotalSaldo(konto.saldo, nySaldo, nordeafondKonto);
							}else{
								nySaldo = nordeaFondkonto - belopp;
								raknaTotalSaldo(konto.saldo, nordeaSparkonto, nySaldo);
							}
							$('span.swedbankSaldo').text(konto.saldo+'SEK');
						});
						
					}
					history.pushState(null,null,'Version1.html');
				}
			});
		}else
			alert('Du måste välja bank och konto');//visa error om button är disabled
	});
}(jQuery));
function raknaTotalSaldo(swedbankSaldo,nordeaSparkonto,nordeafondKonto){
	var nordeaSaldo = raknaNordeaSaldo(nordeaSparkonto,nordeafondKonto);
	totalSaldo = nordeaSaldo + swedbankSaldo;
	$('span.totalSaldo').text(totalSaldo + konto.currency);
}

function raknaNordeaSaldo(sparkonto1, fondkonto){
	$('#NordeaSparkonto1').text(sparkonto1 + 'SEK');
	$('#NordeaFondkonto').text(fondkonto + 'SEK');
	var Nordea1 = $('#NordeaSparkonto1').text().replace('SEK','');
	var Nordea1Saldo = parseInt(Nordea1);

	var Nordea2 = $('#NordeaFondkonto').text().replace('SEK','');
	var Nordea2Saldo = parseInt(Nordea2);

	var totalSaldo = Nordea1Saldo + Nordea2Saldo;

	$('#NordeaSumma').text(totalSaldo + "SEK");
	return totalSaldo;//returnera det för att kunde få värde från funktion
}
function RaknaSaldo(){
	params.type = "accounts";
	//Anropa php fil för att kommunicera med API 
	$.get('broker.php',params).done(function(response){
		//få respons från API och spara som object
		 konto={
			saldo:response.balances[0].booked.amount.content,
			currency: response.balances[0].booked.amount.currency
		};
			$('span#SwedbankSparkonto').text(konto.saldo + konto.currency);
			$('span#SwedbankSumma').text($('span#SwedbankSparkonto').text());
			raknaTotalSaldo(konto.saldo,nordeaSparkonto,nordeaFondkonto);
	});
}

function Payments(){
	params.type = "payments";
	$.get('broker.php',params).done(function(response){
	});
}

function overfora(pengar){
	if($('ul.kontoFran li.activeBank a').text()=='Swedbank'){
		if($('ul.firstKonto.kontoTyp li.activeKonto a').text()=='Sparkonto'&&pengar>konto.saldo){
			alert('Du har inte så mycket pengar i ditt konto. Du har :' + konto.saldo + ' SEK ');
			return false;
		}else if($('ul.firstKonto.kontoTyp li.activeKonto a').text()=='Fondkonto'){
			alert('Du har inte fondkonto');
			return false;
		}else 
			return true;
		
	} else if($('ul.kontoFran li.activeBank a').text()=='Nordea'){
		if($('ul.firstKonto.kontoTyp li.activeKonto a').text()=='Sparkonto'&&pengar>50000){
			alert('Du har inte så mycket pengar i ditt konto. Du har :'+nordeaSparkonto+' SEK ');
			return false;
		}
		else if($('ul.firstKonto.kontoTyp li.activeKonto a').text()=='Fondkonto'&&pengar>2000){
			alert('Du har inte så mycket pengar i ditt konto. Du har :'+nordeaFondkonto + 'SEK');
			return false;
		}else 
			return true;
	}
}
