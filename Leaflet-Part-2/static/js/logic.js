// // Define earthquakes and tectonic plates GeoJSON url variables
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Create two layerGroups
var earthquakes = L.layerGroup();
var tectonicplates = L.layerGroup();

// Define tile layers
var satelliteMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>",
  maxZoom: 18,
  id: "mapbox.satellite"
  
});

var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10"
  
});

var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11"
  
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
  id: "dark-v10"
  
});

// Define a baseMaps object to hold the base layers
var baseMaps = {
  "Satellite Map": satelliteMap,
  "Grayscale Map": Esri_WorldGrayCanvas,
  "Outdoors Map": Stadia_Outdoors,
  "Dark Map": Stadia_AlidadeSmoothDark
};

// Create overlay object to hold the overlay layer
var overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicplates
};

// Create the map, giving it the satelliteMap and earthquakes layers to display on load
var myMap = L.map("mapid", {
  center: [
    37.09, -95.71
  ],
  zoom: 2,
  layers: [satelliteMap, earthquakes]
});

// Create a layer control
// Pass in the baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

d3.json(earthquakesURL, function(earthquakeData) {
  // Determine the marker size by magnitude
  function markerSize(magnitude) {
    return magnitude * 4;
  };
  // Determine the marker color by depth
  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "red";
      case depth > 70:
        return "orangered";
      case depth > 50:
        return "orange";
      case depth > 30:
        return "gold";
      case depth > 10:
        return "yellow";
      default:
        return "lightgreen";
    }
  }

  // Create a GeoJSON layer containing the features array
  // Each feature a popup describing the place and time of the earthquake
  L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        // Set the style of the markers based on properties.mag
        {
          radius: markerSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.7,
          color: "black",
          stroke: true,
          weight: 0.5
        }
      );
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
      + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  }).addTo(earthquakes);
  // Sending our earthquakes layer to the createMap function
  earthquakes.addTo(myMap);

  // Get the tectonic plate data from tectonicplatesURL
  d3.json(tectonicplatesURL, function(data) {
    L.geoJSON(data, {
      color: "orange",
      weight: 2
    }).addTo(tectonicplates);
    tectonicplates.addTo(myMap);
  });

    // Add legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend"),
      depth = [-10, 10, 30, 50, 70, 90];
      
      div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
  
      for (var i =0; i < depth.length; i++) {
        div.innerHTML += 
        '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
      };
      legend.addTo(myMap);
});