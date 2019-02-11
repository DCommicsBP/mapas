var arrayTest = [];


estacoes.forEach(element => {
  var estacao = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(element.long), parseFloat(element.lat)]))
  });

  var ide = `estacao${element.id}`
  debugger;
  estacao.setStyle(new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
      content: '<h1 class="teste"></h1>'
    }))
  }));

  $("#" + ide).on("click", function (event) {
    console.log(event);
  });

  estacao.addEventListener("click", ()=>{
    alert('Eu funciono muito bem kkkk'+ element.endereco)
  })
  arrayTest.push(estacao);
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

var map = new ol.Map({
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer],
  target: document.getElementById('map'),
  view: new ol.View({
    center: ol.proj.fromLonLat([-51.22822165500112, -30.026267070739657]),
    zoom: 14
  })
});

map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
      return feature;
    });
  var popupContent = map.forEachLayerAtPixel(evt.pixel,
    function (layer) {
      return layer.get('content');
    });
  if (feature) {
    popup.setPosition(evt.coordinate);
    //---- new code to get the values of the features ------ 
    var atts = feature.getProperties();
    for (var prop in atts) {
      var re = new RegExp("{" + prop + "}", "g");
      var popupContent = popupContent.replace(re, atts[prop]);
    }

    $(popup_div).attr('data-placement', 'auto');
    $(popup_div).attr('data-content', popupContent);
    $(popup_div).attr('data-html', true);
    $(popup_div).popover();
    $(popup_div).popover('show');
  } else {
    $(popup_div).popover('destroy');
  }
});



/*
var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([0, 0]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
  });

  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ /*({
     chor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
    }))
  });

  iconFeature.setStyle(iconStyle);

  var vectorSource = new ol.source.Vector({
    features: [iconFeature]
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

  var map = new ol.Map({
    layers: [ new ol.layer.Tile({
        source: new ol.source.OSM()
      }), 
      vectorLayer
    ],
    
    target: document.getElementById('map'),
    view: new ol.View({
      center: [0, 0],
      zoom: 3
    })
  });

  var element = document.getElementById('popup');

  var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
  });
  map.addOverlay(popup);

  // display popup on click
  map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
          return feature;
        });
    if (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates);
      $(element).popover({
        'placement': 'top',
        'html': true,
        'content': feature.get('name')
      });
      $(element).popover('show');
    } else {
      $(element).popover('destroy');
    }
  });

  // change mouse cursor when over marker
  map.on('pointermove', function(e) {
    if (e.dragging) {
      $(element).popover('destroy');
      return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
  });
*/