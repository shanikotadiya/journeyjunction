const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
  data: {
    type: Buffer, // Store image data as a buffer
    required: true,
  },
  contentType: {
    type: String, // Store content type (e.g., 'image/jpeg', 'image/png')
    required: true,
  },
});

// Creating a Model from that Schema
module.exports = mongoose.model("File", fileSchema);
