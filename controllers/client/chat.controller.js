module.exports.index = async (req, res) => {
  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
  });
};
