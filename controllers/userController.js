const { User } = require("../models");

module.exports = {

    getUsers(req, res) {
    User.find()
    .populate("thoughts")
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },


  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user matches that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      // .then((user) =>
      //   !user
      //     ? res.status(404).json({ message: "No such user exists" })
      //     : Thought.deleteMany({ _id: { $in: course.user } })
      // )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user matches this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req,res){
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends:req.params.friendId}},
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user matches this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
  removeFriend(res,req){
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends:req.params.friendId}},
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user matches this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  }

};