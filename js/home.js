L.mapbox.accessToken = 'pk.eyJ1IjoidGltZWZvcmNoYW5nIiwiYSI6ImNqajlnemY4ZzFkdHAza21ncHNlYXN5a24ifQ.2ir0OTVjqtJECiyIvFoI4w';
var url = 'https://github.com/BranSeal/WebClient_Trendify/blob/master/data/test.geojson';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [-84.4, 33.8],
zoom: 9
});

map.addControl(new mapboxgl.NavigationControl());

function load() {
  // Fetch just the contents of a .geojson file from GitHub by passing
  // `application/vnd.github.v3.raw` to the Accept header
  // As with any other AJAX request, this technique is subject to the Same Origin Policy:
  // http://en.wikipedia.org/wiki/Same_origin_policy the server delivering the request should support CORS.
  $.ajax({
    headers: {
      'Accept': 'application/vnd.github.v3.raw'
    },
    xhrFields: {
      withCredentials: false
    },
    dataType: 'json',
    url: url,
    success: function(geojson) {
        // On success add fetched data to the map.
        L.mapbox.featureLayer(geojson).addTo(map);
    }
  });
}
$(load);