const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

let errorStatus = null;
let errorMessage = "";

const clearVars = () => {
    errorStatus = null;
    errorMessage = "";
  }

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads'));
    },
    filename: function(req, file, cb) {
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        console.log('originalName', originalName, "extension", extension)
        const encodedName = encodeURIComponent(originalName);
        const timestamp = Date.now();
        cb(null, `${encodedName}_${timestamp}.${extension}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
        errorMessage = "File type not supported. Please upload a JPEG or PNG image."
        cb(null, false);
    }
  };

  const filter = function (req, file, callback) {
    const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;

    if (extension && mimeType) {
        return callback(null, true);
    }
    callback(new Error('Invalid file type and/or mime type.'));
}
  
//   const upload = multer({ 
//     storage: storage, 
//     limits: {
//         fileSize: 1024 * 1024 * 5,
//         fieldNameSize: 100
//     },
//     fileFilter: filter
//  });


const upload = multer({
  storage: multer.memoryStorage(),
  // storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: filter,
})

  // app.post('/uploads', upload.single('image'), (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).send({
  //       status: errorStatus,
  //       message: errorMessage
  //     });
  //   }
  //   return res.status(200).send({
  //       status: 200,
  //       message: 'File uploaded successfully!'
  //   });
  // });

  app.post("/uploads", upload.single('image'), async (req, res) => {
    console.log("POST [/uploads] :: Called...");

    try {
      console.log('file', req.file)
        if (!req.file || Object.values(req.file).length === 0) {
            return res.status(500).send({
              status: 500,
              message: 'Error...',
            })
                        
        }
        
        return res.status(200).send({
          status: 200,
          message: "Success!"
        })


    } catch (error) {
        console.log(`POST [/uploads] :: An error occurred. ${error}`);
        return res.status(500).send({
          status: 500,
          message: 'Error...'
        })
    }
});

  clearVars()
