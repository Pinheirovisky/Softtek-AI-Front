//Content Loaded
window.addEventListener("DOMContentLoaded", (e) => {
  var header = document.querySelector(".header");
  var chatRoom = document.querySelector(".chat-room");
  var typeArea = document.querySelector(".type-area");
  var btnAdd = document.querySelector(".button-add");
  var others = document.querySelector(".others");
  var emojiBox = document.querySelector(".emoji-button .emoji-box");
  var emojiButton = document.querySelector(".others .emoji-button");
  var emojis = document.querySelectorAll(".emoji-box span");
  var inputText = document.querySelector("#inputText");
  var btnSend = document.querySelector(".button-send");
  var messageArea=document.querySelector(".message.message-right");
  //Header onclick event
  header.addEventListener("click", (e) => {
    if (typeArea.classList.contains("d-none")) {
      header.style.borderRadius = "20px 20px 0 0";
    } else {
      header.style.borderRadius = "20px";
    }
    typeArea.classList.toggle("d-none");
    chatRoom.classList.toggle("d-none");
  });
  //Button Add onclick event
  btnAdd.addEventListener("click", (e) => {
    others.classList.add("others-show");
  });
  //Emoji onclick event
  emojiButton.addEventListener("click", (e) => {
    emojiBox.classList.add("emoji-show");
  });
   //Button Send onclick event
  btnSend.addEventListener("click", (e) => {
    var mess=inputText.value;
    var bubble=document.createElement('div');
    bubble.className+=" bubble bubble-dark";
    bubble.textContent=mess;
    messageArea.appendChild(bubble);
    inputText.value="";
  });
  for (var emoji of emojis) {
    emoji.addEventListener("click", (e) => {
      e.stopPropagation();
      emojiBox.classList.remove("emoji-show");
      others.classList.remove("others-show");
      inputText.value+=e.target.textContent;
    });
  }
});