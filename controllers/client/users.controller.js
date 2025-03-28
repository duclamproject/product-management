const User = require("../../models/user.model");

module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;
  console.log(userId);

  const users = await User.find({
    _id: { $ne: userId },
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  console.log(users);

  res.render("client/pages/users/not-friend.pug", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};
