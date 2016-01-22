/* Author:
	Adam Arp
*/

var weatherPi = {
	METAR : [],
	defMETAR : ["KDAY"],
	METARURL : "http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=3&mostRecent=true&stationString=",
	//METARURL : "http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=csv&hoursBeforeNow=2&stationString="
};

weatherPi.getMETAR = function(code) {
	var dfd = new $.Deferred();

	$.get(weatherPi.METARURL+code, function( data ) {
	  alert( 'Successful cross-domain AJAX request.',data);
	});

	/*$.ajax({
		type: "GET",
		url: weatherPi.METARURL+code,
		success: function (data) {
			//console.log(data-text);
			dfd.resolve(data);
		},
		error: function (error) {
			dfd.reject(error);
		}
	});*/
};

weatherPi.init = function() {
	console.log('starting WeatherPi', weatherPi);

	weatherPi.METAR = weatherPi.METAR ? weatherPi.METAR : weatherPi.defMETAR;

	$('#addCode').on('submit', function(e) {
		console.log($(this).find('input[name=code]').val());

		e.preventDefault();

		var code = $(this).find('input[name=code]').val();

		weatherPi.getMETAR(code);

		//weatherPi.METAR.push($(this).find('input[name=code]').val());
	});
};

$.when(weatherPi.getMETAR(weatherPi.defMETAR)).then(function (data) {
	console.log('data:', data);

	weatherPi.init();
});
