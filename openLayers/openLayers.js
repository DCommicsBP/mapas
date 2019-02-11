var arrayTest = [];
var map = new ol.Map({
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }),],
  target: document.getElementById('map'),
  view: new ol.View({
    center: ol.proj.fromLonLat([-51.22822165500112, -30.026267070739657]),
    zoom: 14
  })
});

estacoes.forEach(element => {
  var estacao = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(element.long), parseFloat(element.lat)]))
  });
  estacao.setStyle(new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'

    }))
  }));

  var divPopup = document.getElementById('popup')
  map.on('click', function (evt) {
    divPopup.innerHTML = '';
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      return feature;
    });

    if (feature) {
      var coord = feature.getGeometry().getCoordinates();
      var props = feature.getProperties();
      var info = "<h2>bvnvb</h2>";
      var element = document.getElementById('popup');
      var popup = new ol.Overlay({
        element: divPopup,
        positioning: 'bottom-center',
        stopEvent: false
      });
      // Offset the popup so it points at the middle of the marker not the tip
      popup.setOffset([0, -22]);
      popup.show(coord, info);
    } else {
      var url = estacao
        .getSource()
        .getGetFeatureInfoUrl(
          evt.coordinate,
          map.getView().getResolution(),
          map.getView().getProjection(), {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'total_budget'
          }
        );
      reqwest({
        url: url,
        type: 'json',
      }).then(function (data) {
        var feature = data.features[0];
        var props = feature.properties;
        console.log(props.total_budget);
        var info = "<h2>" + props.total_budget + "</h2>";
        console.log(info);
        popup.setPosition(evt.coordinate);
        divPopup.innerHTML = info;
      });
    };

    arrayTest.push(estacao);
  });
});

var vectorSource = new ol.source.Vector({
  features: arrayTest
});


var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

var rasterLayer = new ol.layer.Tile({
  source: new ol.source.TileJSON({
    url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
    crossOrigin: ''
  })
});


map.addLayer(vectorLayer);


function makePopup(content) {
  // alert('eu funciono'+ JSON.stringify(content));
  return 'entrei no element: ' + JSON.stringify(content);

}

