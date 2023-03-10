
// Create earthquake layerGroup
var earthquakes = L.layerGroup();

// Create tile layer
var grayscaleMap =  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  
});

// Create the map, giving it the grayscaleMap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [38.80446860842366, -104.70412200430964],
    zoom: 2,
    layers: [grayscaleMap, earthquakes]
  });


  
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

function earthquakeMarkers(earthquakeData){

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
      layer.bindPopup( "Magnitude: " + feature.properties.mag +
       "</p>" + "<h3>Location: " + feature.properties.place + "</h3>" + "</p>" +
       "Depth:" + (feature.geometry.coordinates[2]) );
    }
  }).addTo(earthquakes);
  // Sending our earthquakes layer to the createMap function
  earthquakes.addTo(myMap);

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
};


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(earthquakeMarkers);
    