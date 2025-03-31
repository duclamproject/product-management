const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");
module.exports.notFriend = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requireFriends = myUser.requestFriends;
  const acceptFriendsFriends = myUser.acceptFriends;

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requireFriends } },
      { _id: { $nin: acceptFriendsFriends } },
    ],
    status: "active",
    deleted: false,
  }).select("avatar fullName");

  // console.log(users);

  res.render("client/pages/users/not-friend.pug", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};
