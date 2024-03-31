const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const secretKey = "fjkhdahsdadhaskdhasjkdhadasdad";
const cors = require("cors"); // Import the cors package
// const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
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

app.use(async (req, res, next) => {
  try {
    const dbconn = await initializeDatabase("journeyjunction", "users");
    req.collection = dbconn.collection;

    next();
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//---------------------------------USER REGISTRATION API--------------------------------------------

app.route("/users").post(async (req, res) => {
  try {
    console.log(req.body);
    const { email, username, password } = req.body;
    console.log(email, username, password);
    const user = await req.collection.findOne({ username: username });
    if (user == null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = { username, email, hashedPassword };
      const result = await req.collection.insertOne(data);
      return res.json(ResponseFormatter(200, result, "data inserted"));
    }
    res
      .status(401)
      .json(ResponseFormatter(401, null, "username is already avaliable"));
  } catch (error) {
    console.log(error);
    res.json(ResponseFormatter(500, null, "internal server error"));
  }
});

//-------------------------------USER LOGIN API----------------------------------------------------

app.route("/users/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await req.collection.findOne({ email });
    console.log(user);

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return res.json(ResponseFormatter(401, null, "Authentication failed"));
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    if (!token) {
      return res.json(ResponseFormatter(500, null, "Token generation failed"));
    }

    const result = await req.collection.updateOne(
      { email },
      { $set: { token } }
    );
    if (result.modifiedCount === 1) {
      return res.json(
        ResponseFormatter(
          200,
          {
            token: token,
            currentuserid: user._id.toString(),
            currentusername: user.username,
          },
          "Login Successfull"
        )
      );
    } else {
      console.log("Token update failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.json(ResponseFormatter(500, null, "Internal server error"));
  }
});

app.listen(port, () => {
  console.log(`app is listen at ${port}`);
});
