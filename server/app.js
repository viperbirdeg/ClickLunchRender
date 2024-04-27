//?dependencias
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

//?Routers
const app = express();
const pedidoRouter = require("./api/v1/routes/pedido.js");
const usuarioRouter = require("./api/v1/routes/usuario.js");
const alimentoRouter = require("./api/v1/routes/alimento.js");
const cafeteriaRouter = require("./api/v1/routes/cafeteria.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();

//?Middlewares
//* Mostar las solicitudes y respuestas
app.use(morgan("dev"));
//* Utilizar formato .JSON
app.use(express.json());
//* Utilizar cors for fetchs
app.use(cors({
  //credentials: true
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

//?Ruta de "apoyo" {Eliminar para produccion final}

app.get("/api", (req, res) => {
  res.json({ message: "La ptm el servidor no jala" });
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
