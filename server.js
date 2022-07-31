const express = require("express");
const multer = require("multer");
const path = require("path")


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => res.send('File upload API'))

app.put("/upload_files", upload.single("file"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Successfully uploaded file", data: req.file });
}

app.listen(5000, () => {
    console.log(`Server started: running on port 5000`);
});