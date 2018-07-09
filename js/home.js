// setting max date for pickers
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("mapday").setAttribute("max", today);

// a bunch of pre-loading map things
var map = null;

document.addEventListener('DOMContentLoaded', function() {
	L.mapbox.accessToken = 'pk.eyJ1IjoidGltZWZvcmNoYW5nIiwiYSI6ImNqajlnemY4ZzFkdHAza21ncHNlYXN5a24ifQ.2ir0OTVjqtJECiyIvFoI4w';
	map = L.mapbox.map('map', 'mapbox.streets').setView([33.75, -84.4], 11);
	// console.log("loaded");
}, false);

// show new map data once submit is pressed
success: function showMapData() {
	url = 'data/' + document.getElementById('mapday').value + '.geojson';
	// window.alert(url);

	document.getElementById('map').innerHTML = "<div id='map' style='height: 500px; width: 800px;'></div>";
	L.mapbox.accessToken = 'pk.eyJ1IjoidGltZWZvcmNoYW5nIiwiYSI6ImNqajlnemY4ZzFkdHAza21ncHNlYXN5a24ifQ.2ir0OTVjqtJECiyIvFoI4w';
	if(map !== null && typeof( map ) !== 'undefined' ) {
		map.remove();
	}
    map = L.mapbox.map('map', 'mapbox.streets').setView([33.75, -84.4], 11);

    // As with any other AJAX request, this technique is subject to the Same Origin Policy:
    // http://en.wikipedia.org/wiki/Same_origin_policy
    // So the CSV file must be on the same domain as the Javascript, or the server
    // delivering it should support CORS.
    
    try {
    	var featureLayer = L.mapbox.featureLayer();
	    if (!featureLayer.loadURL(url)) {
	    	throw ('No Data!');
	    }
	    featureLayer.addTo(map);
	} catch (error) {
		window.alert("There is no data for this day.");
	}
}
