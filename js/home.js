var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

d3.tsv("data/example-chart.tsv", function(d) {
  d.date = parseTime(d.date);
  d.close = +d.close;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});

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
document.getElementById("end").setAttribute("max", today);

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
    	var featureLayer = L.mapbox.featureLayer()
    	if (!L.geojson(url)) {
    		console.log("error");
    	}
	    if (!featureLayer.loadURL(url)) {
	    	throw ('No Data!');
	    }
	    featureLayer.addTo(map);
	} catch (error) {
		window.alert("There is no data for this day.");
	}
}
