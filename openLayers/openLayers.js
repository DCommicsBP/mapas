function openLayers(){
    const markerSource = new ol.source.Vector();

    var markerStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
      }))
    });

   /* var map = new ol.Map({
        target: 'mapOpenLayers',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-51.23044788782864, -30.02878590159885]),
          zoom: 10
        })
      });

      map.on("click", ()=>{
        console.log(map.getEventCoordinate(event)); 
      }); 

      var markers = new ol(); 
      console.log('Markers ===> ', markers)
*/
let map = new ol.Map({
    target: 'mapOpenLayers',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      new ol.layer.Vector({
        source: markerSource,
        style: markerStyle,
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([6.661594, 50.433237]),
      zoom: 3,
    })
  });
  
  
  function addMarker(lon, lat) {
    console.log('lon:', lon);
    console.log('lat:', lat);
  
    var iconFeatures = [];
  
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
        'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });
  
    markerSource.addFeature(iconFeature);
  }
  
  map.on('singleclick',function(event){
    var lonLat = ol.proj.toLonLat(event.coordinate);
    addMarker(lonLat[0], lonLat[1]);
  });

}

openLayers(); 