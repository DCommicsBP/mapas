

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