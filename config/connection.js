const { connect, connection } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

connect(connectionString, {
  useNewUrlParser: true,
  //new mongo update doesn't support line below
  //useUnifiedTopoology: true,
});

module.exports = connection;