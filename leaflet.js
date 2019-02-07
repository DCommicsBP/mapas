
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  }); 

var estacao = function (element) {
    var html = `
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${element.imagem.url}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${element.valor} </h5>
                <ul>`;
                element.caracteristicas.forEach(function(item) {
                    html += `<li>${item}</li>`;
                });
    html += ` </ul>
            </div>
        </div>
    `;
    return html;
}; 

var pontoTuristico = function (param) { 

    var html = ` 
    <div class="card" style="width: 18rem">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" style:position:relative; top: -100px>
          <div class="carousel-item active">
            <img class="d-block w-100" src="${param.imagens[0]}" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${param.imagens[1]}" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${param.imagens[2]}" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    <div class="card-body">
        <h5 class="card-title">${param.nome}</h5>
       
            <p>
                <b>Endereço:</b> ${param.endereco}

            </p>
            <p>
                ${param.descricao}
            </p>
            <p>
                Funcionamento: ${param.horario}
            </p>
         
    </div>
</div>
   
   
    `; 
    return html;
}; 

var modal = function(param){
var html = `
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`;  
return html;
}

var map = L.map('mapLeaflet', {
    center: [-30.030194684981844, -51.22252230705834],
    zoom: 16
});

var points = []; 
var pointsT = []; 
var markers = [];
var count = 0;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 30,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGFpb25lcGF2YW4iLCJhIjoiY2pya291cHRkMDAxZjN5bXV4dXplNmZlZiJ9.HgEOhElkyIEQfGHN1o3W5g', 
    zoomControl: false
}).addTo(map);

// start the map in South-East England

var iconustom = L.icon({
    iconUrl: './content/images/pinTrainStation2.png',
    shadowUrl: '',
    iconSize: [70, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var iconMuseum = L.icon({
    iconUrl:"./content/images/teste.png",
    shadowUrl: '',
    iconSize: [50, 50], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    popupAnchor: [-3, -76]
}); 



//map.on('click', function(e) {
//    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
// });

var marker2 = L.marker([-30.036108261098676, -51.216459274292], { icon: iconustom }).addTo(map);
marker2.on('click', function(ev){
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
    console.log(ev);
    $('#mymodal').modal('show');
    // aqui vai requisição ajax que vai popular a modal. 

  });

  markers.push(marker2); 
for (var i = 0; i < estacoes.length; i++) {
    var element = estacoes[i];
    points.push([element.lat, element.long]); 
    var marker = L.marker([element.lat, element.long], { icon: iconustom }).addTo(map);
    markers.push(marker); 
    
    marker.bindPopup(estacao(element)); 
    marker.bindTooltip(element.valor); 
    marker.on('click', function(ev){
        var latlng = map.mouseEventToLatLng(ev.originalEvent);

      });
    count++;
}

pontosTuristicos.forEach(element => {
    pointsT.push([element.coordenada.lat, element.coordenada.long])
    var marker = L.marker([element.coordenada.lat, element.coordenada.long], {icon: iconMuseum}).addTo(map);
    markers.push(marker); 
   //  marker.bindPopup(pontoTuristico(element));
    marker.bindTooltip(element.nome).addTo(map); 
    marker.on('click', function(ev){
        var latlng = map.mouseEventToLatLng(ev.originalEvent);
        document.getElementById("mainContent").innerHTML = pontoTuristico(element); 
        $("#myModal").modal('show');
      });
    count++;
    
});

map.on('popupopen', function(e) {
    var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.popup._container.clientHeight/2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});

var polyline = L.polyline(points, {color: '#058AC4'}).addTo(map);

$("")

