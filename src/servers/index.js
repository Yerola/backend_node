const colors = require('colors')
console.log("entramos en server".bgGreen)

const express = require('express' );
const cookieParser =require('cookie-parser');
const morgan = require('morgan');

const routes=require('../routes/routes.js')
const server = express();
server.name='prueba de back end';

server.use(cookieParser());
server.use(morgan('dev'));

server.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  
  next();
});

server.use("/api",routes);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error("eeeeeee", err);
  res.status(status).send(message);
});

module.exports=server;

