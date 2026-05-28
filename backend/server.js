const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const photosRoutes = require("./routes/api/photo");
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

const whitelist = ["http://localhost:3000", "http://127.0.0.1:8080"]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin !== -1 || !origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    optionsSuccessStatus: 200
  }
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/photos', photosRoutes);

app.all('/{*path}', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));