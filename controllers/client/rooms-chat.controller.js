const RoomChat = require("../../models/room-chat.model");
const User = require("../../models/user.model");
const roomsChatSocket = require("../../sockets/client/rooms-chat.socket");

// [Get] /chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const roomsChat = await RoomChat.find({
    "users.user_id": userId,
    deleted: false,
  });
  // console.log(roomsChat);

  res.render("client/pages/rooms-chat/index", {
    pageTitle: "Danh sách phòng chat",
    roomsChat: roomsChat,
  });
};
// [Get] /chat/create
module.exports.create = async (req, res) => {
  const friendList = res.locals.user.friendList;

  for (const friend of friendList) {
    const infoFriend = await User.findOne({
      _id: friend.user_id,
    }).select("fullName avatar");

    friend.infoFriend = infoFriend;
  }

  res.render("client/pages/rooms-chat/create", {
    pageTitle: "Tạo mới phòng chat",
    friendList: friendList,
  });
};
// [Get] /chat/create
module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const usersId = req.body.userId;
  const dataChat = {
    title: title,
    typeRoom: "group",
    users: [],
  };

  usersId.forEach((item) => {
    dataChat.users.push({
      user_id: item,
      role: "user",
    });
  });

  dataChat.users.push({
    user_id: res.locals.user.id,
    role: "superAdmin",
  });

  const room = new RoomChat(dataChat);
  await room.save();

  res.redirect(`/chat/${room.id}`);
};
// [Get] /chat/delete/:roomChatId
module.exports.deleteRoom = async (req, res) => {
  const roomChatId = req.params.roomChatId;
  await RoomChat.updateOne({ _id: roomChatId }, { deleted: true });
  req.flash("success", "Xóa thành công phòng chat!");
  res.redirect("back");
};
