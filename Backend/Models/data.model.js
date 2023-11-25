const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  userInformation: { type: String }, 
  s3Key: { type: String, required: true }, 
  thumbnailS3Key: { type: String },
});

const File = mongoose.model('file', fileSchema);

module.exports = {
  File
};