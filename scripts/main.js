$(document).ready(function () {
  vis = cartodb.createVis('map', 'https://anagraph.carto.com/api/v2/viz/bd20a288-5a7d-11e6-85cb-0e3ff518bd15/viz.json', {
    // shareable: true,
    // title: true,
    // description: true,
    // search: true,
    // tiles_loader: true,
    layer_selector: true,
    center_lat: 45.5388,
    center_lon: -73.6654,
    zoom: 11,
    no_cdn: true
  })
  .error(function(err) {
    console.log(err);
  }).done(function (vis,layers) {
    var drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
          drawError: {
            color: '#b00b00',
            timeout: 1000
          },
          shapeOptions: {
            color: '#bada55'
          }
        },
        circle: false,
        marker: false
      }
    });

     vis.getNativeMap().addControl(drawControl);
  }

  );

});
