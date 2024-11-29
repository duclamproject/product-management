const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;

  // SocketIo
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // Lưu vào DB
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
    });
  });
  // End SocketIo
  // Get data
  const chats = await Chat.find({
    deleted: false,
  });
  console.log(chats);
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
