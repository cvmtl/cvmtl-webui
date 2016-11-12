const config = require('./config');
var getAllUrl = config.apiBaseUrl + "projects?type=geojson";
var corridors;
var polygons= new Array();
export function display(map) {
  $.get( getAllUrl, function( items ) {
     for (var item of items) {
      var polygon = L.geoJson(item,{style:config.style})
      polygons.push(polygon)
      polygon.bindLabel(item.properties.description, { noHide: true }).addTo(map);
     }
   }).done(function () {
        console.log('load ok');
   })
};
