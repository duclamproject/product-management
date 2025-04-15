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

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  const userId = dataUsersAccept.getAttribute("data-users-accept");
  // console.log(userId);

  if (userId == data.userId) {
    // Vẽ ra user
    const newBoxUser = document.createElement("div");
    newBoxUser.classList.add("col-6");
    newBoxUser.setAttribute("user-id", data.inforUserA._id);
    newBoxUser.innerHTML = `
      <div class="box-user">
          <div class="inner-avatar">
            <img src="/images/user-avatar.png" alt="${data.inforUserA.fullName}">
          </div>
          <div class="inner-info">
            <div class="inner-name">${data.inforUserA.fullName}</div>
            <div class="inner-buttons">
              <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.inforUserA._id}">Chấp nhận</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.inforUserA._id}">Xóa</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="btn-deleted-friend" disabled="disabled">Đã xóa</button>
              <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="${data.inforUserA._id}" disabled="disabled">Đã chấp nhận</button>
          </div>
        </div>
      </div>
    `;
    dataUsersAccept.appendChild(newBoxUser);
    // End: Vẽ ra user

    // Xóa lời mời kết bạn
    const btnRefuseFriend = document.querySelector("[btn-refuse-friend]");
    btnRefuseFriend.addEventListener("click", () => {
      btnRefuseFriend.closest(".box-user").classList.add("refuse");
      const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
    // End: Xóa lời mời kết bạn

    // Chấp nhận lời mời kết bạn
    const btnAcceptFriend = document.querySelector("[btn-accept-friend]");
    btnAcceptFriend.addEventListener("click", () => {
      btnAcceptFriend.closest(".box-user").classList.add("accepted");
      const userId = btnAcceptFriend.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
    // End: Chấp nhận lời mời kết bạn
  }
});
// End: SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  const userId = dataUsersAccept.getAttribute("data-users-accept");
  // console.log(userId);

  if (userId == data.userId) {
    // Xóa A khỏi danh sách của B
    const boxUserRemove = document.querySelector(`[user-id="${data.userIdA}"]`);
    // console.log(boxUserRemove);

    if (boxUserRemove) {
      dataUsersAccept.removeChild(boxUserRemove);
    }
  }
});
// End: SERVER_RETURN_USER_ID_CANCEL_FRIEND
