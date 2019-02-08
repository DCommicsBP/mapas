
var map;
function initMap(element) {
    if(element!="btnGoogleMaps") return; 


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -30.030194684981844, lng: -51.22252230705834 },
        zoom: 16
    });

    var iconPontosTuristicos = {
        url: "./content/images/museum.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var iconEstacoes = {
        url: "./content/images/pinTrainStation2.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(1, 1) // anchor
    };
    var count = 0;
    var estacoesMarkers = [];
    var pontosTuristicosMarkers = [];
    var estationPoints = [];
    var map, popup, Popup;
    var infowindow = new google.maps.InfoWindow();

    estacoes.forEach(element => {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.lat, element.long),
            map: map,
            icon: iconEstacoes
        });
        makeInfoWindowEvent(map, infowindow, estacao(element), marker);

        estationPoints.push({ lat: parseFloat(element.lat), lng: parseFloat(element.long) });
        estacoesMarkers.push(marker);
    });

    pontosTuristicos.forEach(element => {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.coordenada.lat, element.coordenada.long),
            map: map,
            icon: iconPontosTuristicos
        });
        makeInfoWindowEvent(map, infowindow, pontoTuristico(element), marker);
        pontosTuristicosMarkers.push(marker);
        count++;
    });

    var polyline = new google.maps.Polyline({
        path: estationPoints,
        geodesic: true,
        strokeColor: '#3478AF',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });

    polyline.setMap(map)
    console.log('Estacoes ===:>', estationPoints);
}

function makeInfoWindowEvent(map, infowindow, card, marker) {
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(card);
        infowindow.open(map, marker);
    });

}


