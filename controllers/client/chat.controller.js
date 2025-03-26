const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/client/chat.socket");
module.exports.index = async (req, res) => {
  // SocketIo
  chatSocket(res);
  // End SocketIo

  // Get data
  const chats = await Chat.find({
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
