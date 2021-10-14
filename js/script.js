
const $url = 'https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/-18.9127749,-48.2755227?exclude=minutely,hourly,daily,flags,alerts';
var $d = new Date();
//google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';

$(document).ready(function () {

  axios.get($url).then(
    (result) => {

      console.log(result.data)
      alteraImagem();
      document.getElementById('local').innerHTML = nomeFormatado();
      document.getElementById('latitude').innerHTML = result.data.latitude;
      document.getElementById('longitude').innerHTML = result.data.longitude;
      document.getElementById('resumo').innerHTML = result.data.currently.summary;
      document.getElementById('dt-hr').innerHTML = dataHoraFormatada() + " " + horaFormatada();
      document.getElementById('precipitacao').innerHTML = result.data.currently.precipProbability;
      document.getElementById('temperatura').innerHTML = result.data.currently.temperature;
      document.getElementById('sensacao').innerHTML = result.data.currently.apparentTemperature;
      document.getElementById('ponto-orvalho').innerHTML = result.data.currently.dewPoint;
      document.getElementById('umidade').innerHTML = result.data.currently.humidity;
      document.getElementById('pressao').innerHTML = result.data.currently.pressure;
      document.getElementById('velocidade').innerHTML = result.data.currently.windSpeed;
      document.getElementById('rajada').innerHTML = result.data.currently.windGust;
      document.getElementById('direcao-vento').innerHTML = result.data.currently.windBearing;
      document.getElementById('cobertura-nuvens').innerHTML = result.data.currently.cloudCover;
      document.getElementById('indice-uv').innerHTML = result.data.currently.uvIndex;
      document.getElementById('visibilidade').innerHTML = result.data.currently.visibility;
      document.getElementById('ozonio').innerHTML = result.data.currently.ozone;
      document.getElementById('deslocamento').innerHTML = result.data.offset;

      function nomeFormatado() {
        lugar = result.data.timezone;
        posicao = lugar.indexOf('/') + 1;
        return lugar.slice(posicao);
      }

      function alteraImagem() {
        if (result.data.currently.icon == 'cloudy') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-night-cloudy.svg');
        }
        if (result.data.currently.icon == 'clear-day') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-day.svg');
        }
        if (result.data.currently.icon == 'clear-night') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-night-clear.svg');
        }
        if (result.data.currently.icon == 'cloudy') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-cloud.svg');
        }
        if (result.data.currently.icon == 'partly-cloudy-day') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-day-cloudy-high.svg');
        }
        if (result.data.currently.icon == 'partly-cloudy-night') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-night-cloud.svg');
        }
        if (result.data.currently.icon == 'rain') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-day-rain.svg');
        }
        if (result.data.currently.icon == 'sleet') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-day-sleet.svg');
        }
        if (result.data.currently.icon == 'snow') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-day-snow.svg');
        }
        if (result.data.currently.icon == 'wind') {
          $('#imagem').attr('src', 'img/weather-icons-master/svg/wi-windy.svg');
        }
      }

    });

});


function dataHoraFormatada(d) {
  $dia = $d.getDate(),
    $mes = $d.getMonth() + 1,
    $ano = $d.getFullYear();
  return [$dia, $mes, $ano].join('/');
}
function horaFormatada(d) {
  $hora = $d.getHours(),
    $minutos = $d.getMinutes();
  return [$hora, $minutos].join(':');
}

function insertGoogleScript() {
  var google_api = document.createElement('script'),
  
    api_key = CHAVE;
  // Inject the script for Google's API and reference the initGoogleAPI
  // function as a callback.
  google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
  document.body.appendChild(google_api);
}
function initGoogleAPI() {
  var autocomplete = new google.maps.places.SearchBox(document.querySelector("#cidade"));
  autocomplete.addListener('places_changed', function () {
    var place = autocomplete.getPlaces()[0];
    latitude = place.geometry.location.lat();
    console.log("A= " + latitude);
    longitude = place.geometry.location.lng();
    console.log("A= " + longitude);
    sessionStorage.setItem("pegaLat", latitude);
    sessionStorage.setItem("pegaLong", longitude);
    console.log($("#cidade").val());
  })
};




