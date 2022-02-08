const { Thought, User } = require("../models");


module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought matches that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought with that ID!" })
          : reactionSchema.deleteMany({ _id: { $in: reaction.thoughts } })
      )
      .then(() => res.json({ message: "Thought and reaction deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId })
          .then((reaction) =>
            !reaction
              ? res.status(404).json({ message: "No reaction with that ID" })
              : Thought.findOneAndUpdate(
                  { reaction: req.params.reactionId },
                  { $pull: { reaction: req.params.reactionId } },
                  { new: true }
                )
          )
          .then(() => res.json({ message: "Reaction deleted!" }))
          .catch((err) => res.status(500).json(err));
  },
};
