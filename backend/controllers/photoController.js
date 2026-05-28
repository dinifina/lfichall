const fs = require("fs");
const path = require("path");
const multer = require("multer");

const UPLOADS_DIR = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newName = `myphoto${ext}`
    cb(null, newName)
  },
});

const upload = multer({ storage });

const getPhoto = (req, res) => {
  const filename = req.query.file;
  const filepath = path.join(UPLOADS_DIR, filename);

  fs.readFile(filepath, (err, data) => {
    if (err) return res.status(404).json({ error: "File not found :(" });
    res.send(data);
  });
};

const uploadPhoto = (req, res) => {
  upload.single("uploaded_photo")(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const files = fs.readdirSync(UPLOADS_DIR);

    const matchedFiles = files.filter(file => {
      return path.basename(file, path.extname(file)) === "myphoto";
    });

    for (const filename in matchedFiles) {
      fs.rm(path.join(UPLOADS_DIR, filename), (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        console.log("File replaced successfully");
      })
    }
    res.status(200).json({ message: "Uploaded", filename: req.file.originalname });
  });
};

module.exports = { getPhoto, uploadPhoto };