document
  .getElementById("chat-form")
  .addEventListener("submit", function (event) {
    const API_URL = "http://localhost:8080/api/gemini/enviar-pergunta";
    const API_KEY = "YOUR_GOOGLE_API_KEY";

    event.preventDefault(); // Impede o envio padrão do formulário

    let message = document.getElementById("inputText").value;
    let chatRoom = document.getElementById("chat-room");

    // Adiciona a mensagem do usuário ao chat
    let userMessage = `
        <div class="message message-right">
            <div class="avatar-wrapper avatar-small">
                <img src="./img/personas/ARTHUR.png" alt="avatar" />
            </div>
            <div class="bubble bubble-dark">
                ${message}
            </div>
        </div>
    `;
    chatRoom.innerHTML += userMessage;

    // Rola o chat para a última mensagem
    chatRoom.scrollTop = chatRoom.scrollHeight;

    // Exibe a mensagem "digitando..." por 2 segundos
    let typingMessage = `
        <div class="message message-left typing-indicator">
            <div class="avatar-wrapper avatar-small">
                <img src="./img/Coda.png" alt="avatar" />
            </div>
            <div class="bubble bubble-light">
                <em>Côda está digitando...</em>
            </div>
        </div>
    `;
    chatRoom.innerHTML += typingMessage;

    // Rola o chat para a última mensagem
    chatRoom.scrollTop = chatRoom.scrollHeight;

    // Envia a mensagem para a API
    setTimeout(() => {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nroChamado: message, apiKey: API_KEY }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Remove a mensagem "digitando..."
          const typingIndicator = document.querySelector(".typing-indicator");
          if (typingIndicator) {
            typingIndicator.remove();
          }

          if (data.mensagem) {
            // Transformar cada '\n\n' em uma nova mensagem:
            data.mensagem.split("\n\n").forEach((msg) => {
              // Adiciona a resposta da API ao chat
              const botMessage = `
                <div class="message message-left">
                    <div class="avatar-wrapper avatar-small">
                        <img src="./img/Coda.png" alt="avatar" />
                    </div>
                    <div class="bubble bubble-light">
                        ${msg.replace(/\n/g, "<br />")}
                    </div>
                </div>
                `;
              chatRoom.innerHTML += botMessage;
            });

            const botMessage = `
                <div class="message message-left">
                    <div class="avatar-wrapper avatar-small">
                        <img src="./img/Coda.png" alt="avatar" />
                    </div>
                    <div class="bubble bubble-light">
                        Gostaria de ajuda em outros chamados? Digite um novo chamado para continuar.
                    </div>
                </div>
                `;
            chatRoom.innerHTML += botMessage;
          } else {
            if (data.status === 404) {
              const botMessage = `
                    <div class="message message-left">
                        <div class="avatar-wrapper avatar-small">
                            <img src="./img/Coda.png" alt="avatar" />
                        </div>
                        <div class="bubble bubble-light">
                            Chamado não encontrado. Por favor, entre na aba "Chamados" e selecione um número de chamado válido.
                        </div>
                    </div>
                    `;
              chatRoom.innerHTML += botMessage;
            } else if (data.status === 403) {
              const botMessage = `
                      <div class="message message-left">
                          <div class="avatar-wrapper avatar-small">
                              <img src="./img/Coda.png" alt="avatar" />
                          </div>
                          <div class="bubble bubble-light">
                              API KEY inválida. Verique se sua API esta setada corretamente no seu código.
                          </div>
                      </div>
                      `;
              chatRoom.innerHTML += botMessage;
            }
          }

          // Rola o chat para a última mensagem
          chatRoom.scrollTop = chatRoom.scrollHeight;
        });
    }, 1500);

    // Limpa o campo de entrada de texto
    document.getElementById("inputText").value = "";
  });
