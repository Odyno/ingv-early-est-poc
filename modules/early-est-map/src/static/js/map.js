function createRealtimeLayer(url) {
  return L.realtime(url, {
    interval: 10000,
    getFeatureId: function(f) {
      return f.properties.url;
    },
    cache: true,
    onEachFeature(f, l) {
      l.bindPopup(function() {
        return (
          "<h3>" +
          f.properties.place +
          "</h3>" +
          "<p>" +
          new Date(f.properties.time) +
          "<br/>Magnitude: <strong>" +
          f.properties.mag +
          "</strong></p>" +
          '<p><a href="' +
          f.properties.url +
          '">More information</a></p>'
        );
      });
    }
  });
}

var map = L.map("map");
var realtime = createRealtimeLayer("http://localhost:3001/api").addTo(map);

L.tileLayer("https://a.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; https://ingv.it , &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

realtime.once("update", function() {
  console.log("Update!");
  map.fitBounds(realtime.getBounds(), { maxZoom: 3 });
});

// create the sidebar instance and add it to the map
var sidebar = L.control
  .sidebar({ container: "sidebar" })
  .addTo(map)
  .open("home");
