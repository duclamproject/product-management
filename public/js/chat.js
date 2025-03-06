import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      const bodyChat = document.querySelector(".chat .inner-body");
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
      bodyChat.scrollTop = bodyChat.scrollHeight;
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  const userId = document.querySelector("[my-id]").getAttribute("my-id");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

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

  body.insertBefore(div, boxTyping);
  body.scrollTop = body.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll chat to bottom

// Show Typing
var timeout;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");
  bodyChat.scrollTop = bodyChat.scrollHeight;

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
// End Show Typing

// Emoji Picker Element
// Show Popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}

// Insert Icon
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;

    inputChat.value += icon;
    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();
    showTyping();
  });

  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
}
// End Emoji Picker Element

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const bodyChat = document.querySelector(".chat .inner-body");
      const exitsTyping = elementListTyping.querySelector(
        `[user-id="${data.userId}"]`
      );
      if (!exitsTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);
        boxTyping.innerHTML = `
       <div class="inner-name">${data.fullName}</div>
        <div class="inner-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
        elementListTyping.appendChild(boxTyping);
        bodyChat.scroll = bodyChat.scrollHeight;
      }
    } else {
      const bodyChat = document.querySelector(".chat .inner-body");
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id= "${data.userId}"]`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    }
  });
}
// End SERVER_RETURN_TYPING
