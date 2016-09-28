$(document).ready(function () {
//  visurl = 'https://anagraph.carto.com/api/v2/viz/bd20a288-5a7d-11e6-85cb-0e3ff518bd15/viz.json';
  var visurl = 'https://thomasragot.carto.com/api/v2/viz/a616c578-856a-11e6-864f-0ecd1babdde5/viz.json';
  vis = cartodb.createVis('map', visurl , {
     shareable: false,
    // title: true,
     description: false,
    search: false,
    // tiles_loader: true,
    layer_selector: false,
    center_lat: 45.5388,
    center_lon: -73.6654,
    zoom: 11,
    no_cdn: true
  })
  .error(function(err) {
    console.log(err);
  }).done(function (vis,layers) {
    console.log('done');
  });
});
