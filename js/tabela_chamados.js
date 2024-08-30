const API_URL = "http://localhost:8080/api/chamados";

// Tabela de Chamados Abertos
fetch(`${API_URL}/em-fila`)
  .then(function (response) {
    return response.json();
  })
  .then(function (chamados) {
    let placeholder = document.querySelector("#chamados_abertos");
    let out = "";
    for (let chamado of chamados) {
      out += `
      <tr>
          <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-danger">NA FILA</span>
          </td>
          <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
          </td>
          <td>
              <h6 class="mb-0 text-sm">${chamado.numero}</h6>
          </td>
          <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
          </td>
      </tr>
    `;
    }
    placeholder.innerHTML += out;
  });

fetch(`${API_URL}/em-tratamento`)
  .then(function (response) {
    return response.json();
  })
  .then(function (chamados) {
    let placeholder = document.querySelector("#chamados_abertos");
    let out = "";
    for (let chamado of chamados) {
      out += `
        <tr>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-warning">EM TRATATIVA</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
          </td>
          <td>
            <h6 class="mb-0 text-sm">${chamado.numero}</h6>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
          </td>
        </tr>
      `;
    }
    placeholder.innerHTML += out;
  })
  .catch(function (error) {
    console.error("Erro ao buscar os chamados:", error);
  });

// Tabela de Chamados Pendentes
fetch(`${API_URL}/em-validacao`)
  .then(function (response) {
    return response.json();
  })
  .then(function (chamados) {
    let placeholder = document.querySelector("#chamados_pendentes");
    let out = "";
    for (let chamado of chamados) {
      out += `
      <tr>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-dark">REQUER VALIDAÇÃO</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
        </td>
        <td>
          <h6 class="mb-0 text-sm">${chamado.numero}</h6>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
        </td>
      </tr>
    `;
    }
    placeholder.innerHTML += out;
  });

// Tabela de Chamados Encerrados
fetch(`${API_URL}/resolvidos`)
  .then(function (response) {
    return response.json();
  })
  .then(function (chamados) {
    let placeholder = document.querySelector("#chamados_encerrados");
    let out = "";
    for (let chamado of chamados) {
      out += `
      <tr>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-success">RESOLVIDO</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.aberto}</span>
        </td>
        <td>
          <h6 class="mb-0 text-sm">${chamado.numero}</h6>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${chamado.descricao}</span>
        </td>
      </tr>
    `;
    }
    placeholder.innerHTML += out;
  });
