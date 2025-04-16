const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");

// [GET]: /users/not-friend
module.exports.notFriend = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  const friendList = myUser.friendList.map((friend) => friend.user_id);

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
      { _id: { $nin: friendList } },
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

// [GET]: /users/request
module.exports.request = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({ _id: userId });
  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  // console.log(users);

  res.render("client/pages/users/request.pug", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};

// [GET]: /users/accept
module.exports.accept = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({ _id: userId });
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  console.log(users);

  res.render("client/pages/users/accept.pug", {
    pageTitle: "Lời mời kết bạn",
    users: users,
  });
};

// [GET]: /users/friends
module.exports.friends = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket

  const userId = res.locals.user.id;
  const myUser = await User.findOne({ _id: userId });
  const friendIds = myUser.friendList.map((friend) => friend.user_id);

  const users = await User.find({
    _id: { $in: friendIds },
    status: "active",
    deleted: false,
  }).select("id avatar fullName statusOnline");

  // console.log(users);

  res.render("client/pages/users/friends.pug", {
    pageTitle: "Danh sách bạn bè",
    users: users,
  });
};
