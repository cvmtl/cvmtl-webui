const $ = require('jquery');
const config = require('./lib/config');
const polylabel = require('polylabel');
const mapboxgl = require('mapbox-gl');
const mapHelper = require('./lib/map-helper.js');
const fullscreen = require('./lib/fullscreen.js');
const ruelles_geojson = require('./lib/chatsderuelles.js');
const Modal = require('semantic-ui-modal');
const Transition = require('semantic-ui-transition');
const Dimmer = require('semantic-ui-dimmer');
const geojsonArea = require('@mapbox/geojson-area');


$.fn.dimmer = Dimmer;
$.fn.transition = Transition;
$.fn.modal = Modal;



function toggleLayerMenu() {
    if ($('#menu').hasClass('visible')) {
        $('#menu').removeClass('visible');
        $('#menu').hide();
    } else {
        $('#menu').addClass('visible');
        $('#menu').show();
    }
}

/**
 * Sort the projects, such that the 'territories
 * are first in the list. This is done, to ensure
 * the smaller areas appear in front of the
 * larger areas, so hover works as expected.
 */
function sortProjects(projects) {
    projects = projects.sort(function(objA, objB) {
        if (objA.properties.category && objB.properties.category) {
            var categoryA = objA.properties.category;
            var categoryB = objB.properties.category;
            if (categoryA && categoryA === categoryB) {
                return objA.properties.title.localeCompare(objB.properties.title);
            } else if (categoryA === 'corridor' && categoryB !== 'corridor') {
                return 1;
            } else if (categoryB === 'corridor' && categoryA !== 'corridor') {
                return -1;
            }
        }
        return 0;
    });
    return projects;
}



$(document).ready(function() {
    var themeName = 'dark';

    var queries = mapHelper.queryFromUrl();

    if (queries.theme) {
        themeName = queries.theme;
    }

    $('#menu').hide();
    $("#layer-icon").on('click', function() {
        toggleLayerMenu();
    })
    mapboxgl.accessToken = config.mapbox.token;
    var map = new mapboxgl.Map({
        container: 'map',
        style: config.getTheme(themeName).style,
        zoom: config.baseZoom,
        center: [config.centerLat, config.centerLng]
    });
    map.addControl(new mapboxgl.NavigationControl(), ['top-left']);

    var getAllUrl = config.apiBaseUrl + "projects?type=geojson";

    map.on('load', function() {

        mapHelper.addStaticLayers(map);

        ruelles_geojson.data.features.forEach(function(marker) {
        //   // create a DOM element for the marker
        console.log(marker);
          var el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = 'url(cdr120.png)';
          el.style.width = '120px';
          el.style.height = '120px';

          // el.addEventListener('click', function() {
          //     // window.alert('toto');
          // });

            // add marker to map
            new mapboxgl.Marker(el)
                .setLngLat([marker.geometry.coordinates[0],marker.geometry.coordinates[1]])
                .addTo(map);
        });
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        $.get(getAllUrl, function(items) {
            $.get('https://corridorsvertsmtl.org/wp-json/wp/v2/projet', function(projects) {
                var i;
                items = sortProjects(items);
                for (let project of projects) {
                    for (let item of items) {
                        if (project.acf.shortname == item.properties.shortname) {
                            item.properties.title = project.acf['nom'];
                            item.properties.goal = project.acf['objectif'];
                            item.properties.facebook = project.acf['page_facebook'];
                            item.properties.website = project.acf['website'];
                            item.properties.details = project.link;
                        }
                    }
                }
                mapHelper.addCorridors(map, items);

                for (i = 0; i < items.length; i++) {
                    const menuId = "item-" + items[i].properties.id;
                    const relatedId = i;
                    const category = items[i].properties.category;
                    $('.menu').append(
                        `<a class="item ${category}" related="${relatedId}">${items[i].properties.title}</a>`
                    );
                }

                $('.item').on('click', function() {
                    var itemId = $(this).attr('related');
                    var item = items[itemId];
                    var p = polylabel(item.geometry.coordinates);
                    map.flyTo({
                        center: p,
                        zoom: 12
                    });
                    mapHelper.hoverCorridor(map, item, popup);
                });

                $('.item').on('mouseover', function() {
                    var itemId = $(this).attr('related');
                    var item = items[itemId];
                    mapHelper.hoverCorridor(map, item, popup);
                });

                map.on('mousemove', function(e) {
                    var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
                    mapHelper.toggleHoverCorridor(map, features, popup);
                });

                map.on("mouseout", function() {
                    map.setFilter("corridors-hover", ["==", "title", ""]);
                });
                map.on('click', function(e) {
                    var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
                    if (!features.length) {
                        return;
                    }
                    var feature = features[0];
                    if (features.length > 1) {
                        for (var i = 1; i < features.length; i++) {
                            if (geojsonArea.geometry(features[i].geometry) < geojsonArea.geometry(feature.geometry)) {
                                feature = features[i];
                            }
                        }

                    }

                    $('.ui.modal .header #title').html(feature.properties.title);
                    $(".ui.modal .content #description").html(feature.properties.goal);
                    $('.ui.modal .content #details-link').attr('href', feature.properties.details);
                    if (typeof(feature.properties.facebook) !== 'undefined' && feature.properties.facebook != '') {
                        $('.ui.modal .content #facebook-link').attr('href', feature.properties.facebook);
                        $('.ui.modal .content #facebook-link').show();
                    } else {
                        $('.ui.modal .content #facebook-link').hide();
                    }
                    if (typeof(feature.properties.website) !== 'undefined' && feature.properties.website != '') {
                        $('.ui.modal .content #website-link').attr('href', feature.properties.website);
                        $('.ui.modal .content #website-link').show();
                    } else {
                        $('.ui.modal .content #website-link').hide();
                    }
                    $('.ui.modal').modal({
                            inverted: true
                        })
                        .modal('show');
                });
            }).done(function(items) {

            })
        }).done(function(items) {

        });
    });

    fullscreen.initEventHandling();
    $('#gofullscreen').on('click', function() {
        fullscreen.toggleFullScreen($('body')[0]);
    });
});
