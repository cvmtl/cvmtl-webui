$(document).ready(function () {
    var map = L.map('map').setView([45.5017, -73.5673], 13);

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

	map.setView(new L.LatLng(45.5017, -73.5673),9);
	map.addLayer(osm);


// 	var layerUrl = 'http://documentation.carto.com/api/v2/viz/836e37ca-085a-11e4-8834-0edbca4b5057/viz.json';
//
//     var vizLayer = cartodb.createLayer(map, layerUrl);
//     vizLayer.addTo(map)
//     .on('done', function(layer) {
//     }).on('error', function() {
//         console.log(error);
//     });
//
//     var accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
//     var mapboxAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
// 			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
// 			'Imagery © <a href="http://mapbox.com">Mapbox</a>';
// 	var mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+accessToken;
//
//     var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});
//     var streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});
//
    var baseMaps = {
        "Open Street Map": osm,
//        "Grayscale": grayscale,
//        "Streets": streets
    };

    var overlayMaps = {
        //"Sample Carto Layer": vizLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);

});