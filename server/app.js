//?dependencias
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const Multer = require("multer");
const cloudinary = require("cloudinary").v2;

//?Routers
const app = express();
const pedidoRouter = require("./api/v1/routes/pedido.js");
const usuarioRouter = require("./api/v1/routes/usuario.js");
const alimentoRouter = require("./api/v1/routes/alimento.js");
const cafeteriaRouter = require("./api/v1/routes/cafeteria.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//?Middlewares
//* Mostar las solicitudes y respuestas
app.use(morgan("dev"));
//* Utilizar formato .JSON
app.use(express.json());
//* Utilizar cors for fetchs

const whitelist = [
  "http://localhost:3000",
  "https://clicklunchrender.onrender.com"
];
app.use(cors({
  origin: '*F'
}));

//*Utiliar body parser
app.use(bodyParser.json());
//* Enviar cliente estatico
app.use(express.static(path.resolve(__dirname, "../client/build")));
//*Usar cookieParser
app.use(cookieParser());
//* Usar sesiones
app.use(
  session({
    secret: "amasemetiootropejelagarto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //Pedir SSL
      httpOnly: true,
    },
  })
);
//*Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
//*multer
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

//?Ruta de "apoyo" {Eliminar para produccion final}

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

//?Rutas de api
app.use("/api/usuario", usuarioRouter);
app.use("/api/pedido", pedidoRouter);
app.use("/api/cafeteria", cafeteriaRouter);
app.use("/api/alimento", alimentoRouter);

//?Ruta inicial
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//?Ruta default
app.get("*", (req, res) => {
  res
    .status(404)
    .sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
