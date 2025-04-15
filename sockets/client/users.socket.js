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

      // Lấy độ dài acceptFriends của B trả về cho B
      const inforUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriendsB = inforUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriendsB: lengthAcceptFriendsB,
      });

      // Lấy thông tin ông A trả về cho B
      const inforUserA = await User.findOne({
        _id: myUserId,
      }).select("id avatar fullName");
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId: userId,
        inforUserA: inforUserA,
      });
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

      // Khi A hủy yêu cầu kết bạn thì cập nhật lại số lượng accept friend bên B
      const inforUserB = await User.findOne({ _id: userId });
      const lengthAcceptFriendsB = inforUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriendsB: lengthAcceptFriendsB,
      });

      // Lấy userId của A gửi về cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userId: userId,
        userIdA: myUserId,
      });
    });

    // Người dùng từ chối yêu cầu kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // ID của B
      // console.log(userId); // ID của A

      // Xóa id của A trong acceptFriends của B
      const exisUserAInB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      // console.log(exisUserAInB); // Là select tất cả của A
      if (exisUserAInB) {
        await User.updateOne(
          { _id: myUserId },
          {
            $pull: { acceptFriends: userId },
          }
        );
      }

      // Xóa id của B trong requestFriends của A
      const exisUserBInA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (exisUserBInA) {
        await User.updateOne(
          { _id: userId },
          {
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });

    // Người dùng chấp nhận yêu cầu kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // ID của B
      // console.log(userId); // ID của A

      // Thêm {user_id, room_chat_id} của A vào friendsList của B - Xóa id của A trong acceptFriends của B
      const exisUserAInB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      // console.log(exisUserAInB); // Là select tất cả của A
      if (exisUserAInB) {
        await User.updateOne(
          { _id: myUserId },
          {
            $push: {
              friendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },

            $pull: { acceptFriends: userId },
          }
        );
      }

      //Thêm {user_id, room_chat_id} của B vào friendsList của A - Xóa id của B trong requestFriends của A
      const exisUserBInA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (exisUserBInA) {
        await User.updateOne(
          { _id: userId },
          {
            $push: {
              friendList: {
                user_id: myUserId,
                room_chat_id: "",
              },
            },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });

    // Người dùng xóa bạn bè
    socket.on("CLIENT_DELETE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // ID của A
      // console.log(userId); // ID của B

      // Xóa id của B ở friendList của A
      await User.updateOne(
        {
          _id: myUserId,
        },
        {
          $pull: { friendList: { user_id: userId } },
        }
      );
      // Xóa id của A vào friendList của B
      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: { friendList: { user_id: myUserId } },
        }
      );
    });
  });
};
