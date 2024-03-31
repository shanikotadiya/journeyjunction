const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const secretKey = "fjkhdahsdadhaskdhasjkdhadasdad";
const cors = require("cors"); // Import the cors package
// const { ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const File = require("./fileSchema.js");

const app = express();
const uri =
  "mongodb+srv://shanikotadiya:ula918oCIYFShP9k@journeyjunction.qsv0wiz.mongodb.net/";
const client = new MongoClient(uri);
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.set("view engine,", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

client
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  });

const ResponseFormatter = (status, data, message = "") => {
  return {
    status,
    data,
    message,
  };
};

const initializeDatabase = async (dbname, tablename) => {
  try {
    await client.connect();
    const database = client.db(dbname);

    const collection = database.collection(tablename);
    const dbconn = {
      collection: collection,
    };
    return dbconn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const storage = multer.memoryStorage(
  {
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
}
);

const upload = multer({ storage: storage });

app.use(async (req, res, next) => {
  try {
    const dbconn = await initializeDatabase("journeyjunction", "users");
    req.collection = dbconn.collection;

    next();
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.route("/users").post(upload.single('image'), async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await req.collection.findOne({ username: username });
    // const { originalname, mimetype, buffer, size } = req.file;

    if (user == null) {
      //   const hashedPassword = await bcrypt.hash(password, 10);
      const data = { username, email, password };
      const result = await req.collection.insertOne(data);
      // console.log(result);
      await File.create({
        data: req.file.buffer,
        contentType: req.file.mimetype
    });
    res.send('Image uploaded successfully.');
      return res.json({ message: "data inserted", result, status: 200 });
    }
    res
      .status(401)
      .json({ message: "username is already avaliable", status: 401 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`app is listen at ${port}`);
});
