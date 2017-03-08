var myVar = setInterval(myTimer, 1000);
var timeout = 0;
var temperatur = 'nc';
var Humidite='nc';
var PsAtmo= 'nc';
var Luminosite = 'nc';
var bruit = 'nc';
var Altitude = 'nc';

var Vol = 'nc';
var State ='nc';
var Gateway= 'nc';
var Ip = 'nc';

var Station = 'nc';
var Song = 'nc';
alert("teste")
var dateData;
var dateDataMemory ;

function displayMyVar (targetElementId)
  {
	document.getElementById('target1').innerHTML = temperatur ;
	document.getElementById('target2').innerHTML = Humidite;
	document.getElementById('target3').innerHTML = PsAtmo;
	document.getElementById('target4').innerHTML = Altitude;
	document.getElementById('target5').innerHTML = Luminosite;
	document.getElementById('target6').innerHTML = bruit;
	
	document.getElementById('target8').innerHTML = Vol;
	document.getElementById('target9').innerHTML = State ;
	document.getElementById('target10').innerHTML = Gateway ;
	document.getElementById('target11').innerHTML = Ip ;
	
	document.getElementById('target12').innerHTML = Station ;
	document.getElementById('target13').innerHTML = Song  ;
  }

function getSensors(dateData)
{

	var urlSensors = 'https://liveobjects.orange-business.com/api/v0/data/streams/urn%3Alo%3Ansid%3AespWebRadio%3A14433047!DataSensor%26OnlineCheck';
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (aEvt) 
	{
		  
	  if (req.readyState == 4) 
	  {
			console.log(req.readyState);
			console.log(req.status);
			if(req.status == 200)
			{
			
				var ArrData = JSON.parse(req.responseText);
				var LastData= ArrData[0];				
				console.log(LastData);
				
				var AllValue = LastData.value;
				console.log(AllValue);
				
				
				dateData = LastData.timestamp;
				console.log(dateData);
				document.getElementById("demo").innerHTML = new Date(dateData);
				
				
				if (dateData != dateDataMemory)
				{
					document.getElementById('xyz').play();
					timeout = 30;
					dateDataMemory = dateData;
				}
				
				temperatur= AllValue.temperatur;
				console.log(temperatur);
				
				Humidite= AllValue.Humidite;
				console.log(Humidite);
				
				PsAtmo= AllValue.PsAtmo;
				console.log(PsAtmo);
				
				Luminosite= AllValue.Luminosite;
				console.log(Luminosite);
				
				bruit= AllValue.bruit;
				console.log(bruit);
				
				Altitude= AllValue.Altitude;
				console.log(Altitude);
				
				displayMyVar ();	
		
			}
			else
			{
				console.log("Erreur pendant le chargement de la page.\n");
			}
	  }
	};
	req.open('GET', urlSensors , true);
	req.setRequestHeader("X-API-KEY", '7ef7949fb37c454aa3087f63c276573d');
	req.send(null);
	getEtat();

}

function getEtat()
{

	var urlEtatRadio = 'https://liveobjects.orange-business.com/api/v0/data/streams/urn%3Alo%3Ansid%3AespWebRadio%3A14433047!State%26OnlineCheck?limit=100';
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (aEvt) 
	{
		  
	  if (req.readyState == 4) 
	  {
			console.log(req.readyState);
			console.log(req.status);
			if(req.status == 200)
			{
			
				var ArrEtat = JSON.parse(req.responseText);
				var LastEtat= ArrEtat[0];				
				console.log(LastEtat);
				
				var AllEtat = LastEtat.value;
				console.log(AllEtat);
								
				Vol= AllEtat.Vol;
				console.log(Vol);
				
				State= AllEtat.State;
				console.log(State);
				
				Gateway= AllEtat.Gateway;
				console.log(Gateway);
				
				Ip= AllEtat.Ip;
				console.log(Ip);
				
				displayMyVar ();
			}
			else
			{
				console.log("Erreur pendant le chargement de la page.\n");
			}
	  }
	};
	req.open('GET', urlEtatRadio , true);
	req.setRequestHeader("X-API-KEY", '7ef7949fb37c454aa3087f63c276573d');
	req.send(null);
	getDataRadio ();
				

}

function getDataRadio()
{

	var urlDataRadio = 'https://liveobjects.orange-business.com/api/v0/data/streams/urn%3Alo%3Ansid%3AespWebRadio%3A14433047!StrucRadioDataAndOnlineCheck?limit=100';
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (aEvt) 
	{
		  
	  if (req.readyState == 4) 
	  {
			console.log(req.readyState);
			console.log(req.status);
			if(req.status == 200)
			{
			
				var ArrDataRadio = JSON.parse(req.responseText);
				var LastDataRadio= ArrDataRadio[0];				
				console.log(LastDataRadio);
				
				var AllDataRadio = LastDataRadio.value;
				console.log(AllDataRadio);
						
				Station= AllDataRadio.Station;
				console.log(Station);
				
				Song= AllDataRadio.Song;
				console.log(Song);
				
				displayMyVar ();
				
			}
			else
			{
				console.log("Erreur pendant le chargement de la page.\n");
			}
	  }
	};
	req.open('GET', urlDataRadio , true);
	req.setRequestHeader("X-API-KEY", '7ef7949fb37c454aa3087f63c276573d');
	req.send(null);				
	
}

function myTimer() 
{
	timeout = timeout -1;

	if (timeout == -1)
	{
	timeout = 0;
	}
	


	document.getElementById("demo1").innerHTML = timeout;
	console.log(dateDataMemory);
	console.log(dateData);
	
	getSensors();
	
}
	
