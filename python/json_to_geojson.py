import json
import sys
import os
from datetime import datetime, timedelta

def main():
	date = ""
	for arg in sys.argv[1:]:
		date = arg

	dir_name='../data'
	base_filename=date
	suffixJSON = '.json'
	suffixGeoJSON = '.geojson'
	filepath = os.path.join(dir_name, base_filename + suffixJSON)

	with open(filepath) as f:
		data = json.load(f)

	date_obj = datetime.strptime(date, '%Y-%m-%d').date()
	end_date = date_obj + timedelta(days=1)
	tomorrow = end_date.isoformat()

	globalID = data["globalID"]

	#calculation of lat/long
	col = globalID % 10000
	row = globalID / 10000
	lon = float(col / 24.0 - 180.0)
	lat = float(row / 24.0 - 90.0)

	title = data["rankedList"][0]

	link = "https://twitter.com/search?q=%23" + title + "%20near%3A" + str(lat) + "%2C" + str(lon) + "%20within%3A2mi%20since%3A" + date + "%20until%3A" + tomorrow + "&src=typd"
	description = "See corresponding tweets here: <br></br> <a target = '_blank' href = '" + link + "'>" + link + "</a>"

	geos = []
	point = {
		'type': 'Feature',
		'properties': {
			"title": "#" + title,
			"description": description
		},
		"geometry": {
			"type": "Point",
			"coordinates": [lon, lat]
		}
	}

	toWrite = {
		"type": "FeatureCollection",
		"features": [point]
	}

	output_filename = os.path.join(dir_name, base_filename + suffixGeoJSON)
	with open(output_filename, 'wb') as output_file:
	    json.dump(toWrite, output_file, indent=2)

if __name__ == "__main__":
    main()