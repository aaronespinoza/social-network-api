const { Schema, model } = require("mongoose");
const thoughtSchema = require("./thought");

const reactionSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: " ",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        isEmail: true,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;