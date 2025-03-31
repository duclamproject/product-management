const User = require("../../models/user.model");

module.exports = async (res) => {
  _io.once("connection", (socket) => {
    // Người dùng gửi yêu cầu kết bạn
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // ID của A
      // console.log(userId); // ID của B

      // Thêm id của A vào acceptFriends của B
      const exisUserAInB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (!exisUserAInB) {
        await User.updateOne(
          { _id: userId },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }
      // Thêm id của B vào requireFriends của A
      const exisUserBInA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (!exisUserBInA) {
        await User.updateOne(
          { _id: myUserId },
          {
            $push: { requestFriends: userId },
          }
        );
      }
    });

    // Người dùng hủy gửi yêu cầu kết bạn
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // ID của A
      // console.log(userId); // ID của B

      // Xóa id của A trong acceptFriends của B
      const exisUserAInB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });

      // console.log(exisUserAInB); // Là select tất cả của B
      if (exisUserAInB) {
        await User.updateOne(
          { _id: userId },
          {
            $pull: { acceptFriends: myUserId },
          }
        );
      }

      // Xóa id của B trong requireFriends của A
      const exisUserBInA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (exisUserBInA) {
        await User.updateOne(
          { _id: myUserId },
          {
            $pull: { requestFriends: userId },
          }
        );
      }
    });
  });
};
