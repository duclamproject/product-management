const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // SocketIo
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // Lưu vào DB
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
      // Trả data cho client
      _io.emit("SERVER_RETURN_MESSAGE", {
        // Trả userId là cái user gửi message lên cho server (Nếu A gửi thì khi trả về cho B sẽ có tên là A)
        userId: userId,
        fullName: fullName,
        content: content,
      });
    });
    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
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
