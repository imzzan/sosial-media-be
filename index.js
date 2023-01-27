import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import postRoutes from "./src/routes/post.js";
import authRoutes from "./src/routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload Image buat tempat penyimpanan baut image
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "_" + file.originalname);
  },
});

// File Filter untuk Image yang ingin di upload
const fileFilter = (req, file, cb) => {
  if (
    file.mimeType === "image/png" ||
    file.mimeType === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Buat middleware baut multer validation di atas
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// Mengatasi error pemanggilan image dari server
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors());
// Membuat Izin ke server bahwa API kita bisa di akses di mana saja
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(bodyParser.json()); //Type Json

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use("/", postRoutes);
app.use("/", authRoutes);
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://zani:muzani12345678@cluster0.a31nuxx.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log("Conection Success"));
  })
  .catch((err) => {
    console.log(err);
  });
