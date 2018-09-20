const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileupload.controller');
//npm install multer --save
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
var upload = multer({ storage: storage });

router.post('/', upload.single('file'), controller.getFileUploaded);

module.exports = router;