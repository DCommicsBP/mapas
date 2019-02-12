var baselayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
var layer1 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://88.99.13.199:8080/geoserver/agristats/wms',
    params: {
      'LAYERS': 'agriculture:megaladimosia',
      'STYLES': 'point',
      'TILED': true
    },
    serverType: 'geoserver'
  })
});
var map = new ol.Map({
  layers: [baselayer, layer1],
  controls: ol.control.defaults().extend([
    new ol.control.ScaleLine({
      units: 'metric'
    }),
    new ol.control.FullScreen()
  ]),
  target: 'mymap',
  view: new ol.View({
    center: [2687148, 4556999],
    zoom: 6.5
  })
});
var element = document.getElementById('popup');
var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);
map.on('click', function(evt) {
	element.innerHTML = '';

  var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    return feature;
  });

  if (feature) {
    var coord = feature.getGeometry().getCoordinates();
    var props = feature.getProperties();
    var info = "<h2>bvnvb</h2>";
    // Offset the popup so it points at the middle of the marker not the tip
    popup.setOffset([0, -22]);
    popup.show(coord, info);
  } else {
    var url = layer1
      .getSource()
      .getGetFeatureInfoUrl(
        evt.coordinate,
        map.getView().getResolution(),
        map.getView().getProjection(), {
          'INFO_FORMAT': 'application/json',
          'propertyName': 'total_budget'
        }); 
   
      fetch(url)
      .then(function(response) {
        return console.log(response);
      });

     }
}); 
