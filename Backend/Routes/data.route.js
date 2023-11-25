const multer = require('multer');
const AWS = require('aws-sdk');
const express= require('express')
const dataRouter=express.Router()
const File=require('../Models/data.model')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'your-region', 
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
dataRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const result = await s3.upload(params).promise();

    const newFile = new File({
      filename: file.originalname,
      userInformation: req.body.userInformation,
      s3Key: result.Key,
    });

    await newFile.save();

    res.status(200).json({
      message: 'File uploaded successfully.',
      data: result,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

dataRouter.get('/files', async (req, res) => {
  try {
    const files = await File.find({}, '-_id filename uploadDate userInformation');

    res.status(200).json({
      message: 'Files retrieved successfully.',
      data: files,
    });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send('Internal Server Error');
  }
});

dataRouter.delete('/deleteFile/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const bucketName = 'YOUR_S3_BUCKET_NAME';

  const params = {
    Bucket: bucketName,
    Key: fileName
  };

  try {
    await s3.deleteObject(params).promise();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting file from S3' });
  }
});


module.exports={
  dataRouter
}