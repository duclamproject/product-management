// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  const userId = document.querySelector("[my-id]").getAttribute("my-id");
  let htmlFullName = "";
  if (userId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// Scroll top to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll top to bottom
