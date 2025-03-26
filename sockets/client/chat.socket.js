const Chat = require("../../models/chat.model");
module.exports = async (res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
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
};
