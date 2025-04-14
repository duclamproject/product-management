// Chức năng gửi yêu cầu
const listButtonAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listButtonAddFriend.length > 0) {
  listButtonAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      // console.log(userId);
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// End: chức năng gửi yêu cầu

// Chức năng hủy gửi yêu cầu
const listButtonCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listButtonCancelFriend.length > 0) {
  listButtonCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      // console.log(userId);
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// End: chức năng hủy gửi yêu cầu

// Chức năng từ chối yêu cẩu kết bạn
const listButtonReFuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listButtonReFuseFriend.length > 0) {
  listButtonReFuseFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");
      const userId = button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  });
}
// End: Chức năng từ chối yêu cẩu kết bạn

// Chức năng chấp nhận yêu cẩu kết bạn
const listButtonAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listButtonAcceptFriend.length > 0) {
  listButtonAcceptFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");
      const userId = button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// End: Chức năng chấp nhận yêu cẩu kết bạn

// Chức năng xóa bạn bè
const listButtonDeleteFriend = document.querySelectorAll("[btn-delete-friend]");
if (listButtonDeleteFriend.length > 0) {
  listButtonDeleteFriend.forEach((button) => {
    button.addEventListener("click", () => {
      const conFirm = confirm("Bạn có muỗn xóa người bạn này không?");
      if (conFirm == true) {
        button.closest(".box-user").classList.add("deleted");
        const userId = button.getAttribute("btn-delete-friend");
        socket.emit("CLIENT_DELETE_FRIEND", userId);
      }
    });
  });
}
// End: Chức năng chấp nhận yêu cẩu kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUsersAccept = document.querySelector("[badge-users-accept]");
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  // console.log(userId);

  if (userId == data.userId) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriendsB;
  }
});

// End: SERVER_RETURN_LENGTH_ACCEPT_FRIEND
