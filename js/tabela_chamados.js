// Tabela de Chamados Abertos
fetch("../json/chamadosEmFila.json")
.then(function(response){
  return response.json();
})
.then(function(chamados){
  let placeholder = document.querySelector("#chamados_abertos");
  let out = "";
  for( let chamado of chamados){
    out += `
      <tr>
          <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-danger">NA FILA</span>
          </td>
          <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
          </td>
          <td>
              <a href="">
                  <h6 class="mb-0 text-sm">${chamado.numero}</h6>
                </a>
          </td>
          <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
          </td>
      </tr>
    `;
  }
  placeholder.innerHTML += out;
})

fetch("../json/chamadosEmTratamento.json")
.then(function(response){
  return response.json();
})
.then(function(chamados){
  let placeholder = document.querySelector("#chamados_abertos");
  let out = "";
  for( let chamado of chamados){
    out += `
      <tr>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-warning">EM TRATATIVA</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
        </td>
        <td>
          <a href="">
              <h6 class="mb-0 text-sm">${chamado.numero}</h6>
            </a>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
        </td>
      </tr>

    `;
  }
  placeholder.innerHTML += out;
})

// Tabela de Chamados Pendentes
fetch("../json/chamadosValidacao.json")
.then(function(response){
  return response.json();
})
.then(function(chamados){
  let placeholder = document.querySelector("#chamados_pendentes");
  let out = "";
  for( let chamado of chamados){
    out += `
      <tr>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-dark">REQUER VALIDAÇÃO</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
        </td>
        <td>
          <a href="">
            <h6 class="mb-0 text-sm">${chamado.numero}</h6>
          </a>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
        </td>
      </tr>
    `;
  }
  placeholder.innerHTML += out;
})

// Tabela de Chamados Encerrados
fetch("../json/chamadosResolvidos.json")
.then(function(response){
  return response.json();
})
.then(function(chamados){
  let placeholder = document.querySelector("#chamados_encerrados");
  let out = "";
  for( let chamado of chamados){
    out += `
      <tr>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-success">RESOLVIDO</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
        </td>
        <td>
          <a href="">
            <h6 class="mb-0 text-sm">${chamado.numero}</h6>
          </a>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
        </td>
      </tr>
    `;
  }
  placeholder.innerHTML += out;
})