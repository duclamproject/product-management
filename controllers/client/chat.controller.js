const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/client/chat.socket");
module.exports.index = async (req, res) => {
  // SocketIo
  chatSocket(req, res);
  // End SocketIo

  const roomChatId = req.params.roomChatId;
  // console.log(roomChatId);

  // Get data
  const chats = await Chat.find({
    room_chat_id: roomChatId,
    deleted: false,
  });
  // console.log(chats);
  for (const chat of chats) {
    const inforUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.inforUser = inforUser;
  }
  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
    chats: chats,
  });
};
