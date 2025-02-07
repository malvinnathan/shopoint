var mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb+srv://Zac:<password>@cluster0-qzhty.mongodb.net/test?retryWrites=true&w=majority";

const MONGO_URL = CONNECTION_STRING.replace("<password>",process.env.MongoPassword);

mongoose.connect(MONGO_URL || "mongodb://localhost/info30005", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "INFO30005"
});

var db = mongoose.connection;
db.on("error", err => {
    console.error(err);
    process.exit(1);
});
db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" +
        db.port);
});

require('./user');

