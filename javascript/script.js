$(document).ready(function() {

    if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
      // latitude holds browser latitude
      //longitude holds browser longitude
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

     // call dark sky
     $.ajax({
       url: 'https://api.darksky.net/forecast/e0ea79cbf23eab2954000635d893f57f/'+ latitude + ',' + longitude + '?exclude=minute;y,hourly,daily,alerts,flags',
       dataType: 'jsonp',
       success: function(currentWeather) {
         var currCond = currentWeather.currently.summary;
         var icon = currentWeather.currently.icon;
         temperature = Math.round(currentWeather.currently.temperature);
         tempInC = Math.round((temperature-32)*5/9);

      // $(.location).html()
       $('.condition').html('<span id="condition">' + currCond + '<span>');
       $('.temperature').html(temperature+" \u2109");
       

         switch(icon) {
							case "clear-day":
							case "clear-night":
								$('.icon').append('<div class="sun"><div class="rays"></div></div>');
								break;
							case "cloudy":
							case "fog":
								$('.icon').append('<div class="cloud"></div><div class="cloud"></div>');
								break;
							case "rain":
							case "sleet":
								$('.icon').append('<div class="cloud"></div><div class="rain"></div>');
								break;
							case "partly-cloudy-day":
							case "partly-cloudy-night":
								$('.icon').append('<div class="cloud"></div><div class="sun"><div class="rays"></div></div>');
								break;
							case "snow":
								$('.icon').append('<div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div>');
								break;
							default:
								$('.icon').append('<div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div>');
						}//switch
       }
     }); //ajax
       $.ajax({
       url: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&result_type=political&latlng=' + latitude + ',' + longitude + '&key=AIzaSyBPJ_3iAmKaBlbI7ycLXNOpm0Ukhfi0nQk',
       dataType: 'json',
       success: function(location) {

         console.log(location)
         var city = location.results[0].formatted_address
         $('.location').html('<span>'+city+'</span>');
        // console.log(city)
      }//success

    }); //Ajax google call
     }); //geolocation
  }; // Navigator

  $('.changeUnit').on('click', function() {

    event.preventDefault();
    var unit = $('.temperature').html();

    if (unit.endsWith(" \u2109")) {
      console.log("HERE!!")
      $('.temperature').html(tempInC+" \u2103");
    } else if (unit.endsWith(' \u2103')) {
      $('.temperature').html(temperature +" \u2109");
    }
    console.log(unit);
})//change unit
}); //ready
