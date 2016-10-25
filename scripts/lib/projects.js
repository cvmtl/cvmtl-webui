const config = require('./config');

export function display(map) {
  $.get( config.apiBaseUrl + "projects?type=geojson", function( items ) {
     for (var item of items) {
        L.geoJson(items,{style:config.style}).addTo(map);
     }
   })
};
