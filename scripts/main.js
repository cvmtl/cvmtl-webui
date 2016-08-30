$(document).ready(function () {
    var map = L.map('map').setView([45.5017, -73.5673], 13);

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

	map.setView(new L.LatLng(45.5017, -73.5673),9);
	map.addLayer(osm);


	var layerUrl = 'http://documentation.carto.com/api/v2/viz/836e37ca-085a-11e4-8834-0edbca4b5057/viz.json';

    cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
    }).on('error', function() {
    //log the error
    });
});