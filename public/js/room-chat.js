const buttonDeleteRoom = document.querySelectorAll("[button-delete-room]");
const formDeleteRoom = document.querySelector("#form-delete-room");
const dataPathDel = formDeleteRoom.getAttribute("data-path");

if (buttonDeleteRoom) {
  buttonDeleteRoom.forEach((item) => {
    item.addEventListener("click", () => {
      const conFirm = confirm("Bạn có chắc chắn muốn xóa đoạn chat này không?");
      if (conFirm) {
        const roomChatIdDel = item.getAttribute("room-chat-id");
        const action = dataPathDel + `${roomChatIdDel}?_method=DELETE`;
        // console.log(action);
        formDeleteRoom.action = action;
        formDeleteRoom.submit();
      }
    });
  });
}
