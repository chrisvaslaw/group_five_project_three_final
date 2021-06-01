var map = (function() {
function createMap(cities) { 
    console.log(cities);
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  
  var baseMaps = {
    "Light Map": lightmap
  };
  
  var overlayMaps = {
    "Cities": cities
  };
  
  var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, cities]
  });
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  }
  
  function createMarkers(response) {
    console.log("hi")
    var cities = response.result;
    var city_markers = []
  
    for (let city of cities) {
      var city_marker = L.marker([city.lat, city.lon])
        .bindPopup(
            "<h3> City: " + city.name + "</h3>" +
            "<h3> Price: " + city.price + "</h3>" +
            "<h3> Pressure: " + city.press + "</h3>" +
            "<h3> Temperature: " + city.temp + "</h3>" +
            "<h3> Humidity: " + city.hum + "</h3>" +
            "<h3> Cloudiness: " + city.cld + "</h3>" 
          )
        city_marker.on('mouseover', function (e) {
            this.openPopup();
        });
        city_marker.on('mouseout', function (e) {
            this.closePopup();
        });
  
      city_markers.push(city_marker)
    }
    console.log(city_markers);
  
    createMap(L.layerGroup(city_markers));
    
  }
  
  
  return createMarkers;

})();