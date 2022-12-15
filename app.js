const express = require('express');
const app = express();
const path = require('path');

const apiRouter = require("./routers/apiRouter")

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Agrega credenciales del vendedor
mercadopago.configure({
  access_token: "APP_USR-7658138216608243-092214-3bbf2c6675a79321bc6a8cbb76f337d0-1203300512",
});

//CARPETA PUBLIC
const publicPath = path.resolve(__dirname, "./public"); 
app.use(express.static(publicPath)); 

//SERVIDOR LEVANTADO
app.listen(3000, () =>{
    console.log("http://localhost:3000");
}); 

//GUARDADO OBJETOS QUE VIENEN POR POST COMO OBJETOS LITERALES EN JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

//METODOS PUT Y DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//ENRUTADORES
app.use("/", apiRouter);
