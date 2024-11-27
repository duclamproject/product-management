module.exports.index = async (req, res) => {
  // SocketIo
  _io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
  });
  // End SocketIo
  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
  });
};
