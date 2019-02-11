var arrayTest = [];


estacoes.forEach(element => {
  var estacao = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(element.long), parseFloat(element.lat)]))
  });

  var ide = `estacao${element.id}`
  estacao.setStyle(new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'

    }))
  }));

 

var rasterLayer = new ol.layer.Tile({
  source: new ol.source.TileJSON({
    url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
    crossOrigin: ''
  })
});



var vectorSource = new ol.source.Vector({
  features: arrayTest
});


var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

var map = new ol.Map({
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer],
  target: document.getElementById('map'),
  view: new ol.View({
    center: ol.proj.fromLonLat([-51.22822165500112, -30.026267070739657]),
    zoom: 14
  })
});
estacao.addEventListener('click', function () { return 'Eu funciono' });
arrayTest.push(estacao);
});


var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [element.long, element.lat]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature) {
      return feature;
    });
  if (feature) {
    var coordinates = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinates);
    $('[data-toggle="popover"]').popover();   
    $(element).show();
  } else {
    element.innerHTML = ""; 
    $(element).hide();
  }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
