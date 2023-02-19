const colors = require('colors');
console.log("entramos al index".bgCyan);


const server = require('./src/servers');
const { conn } = require('./src/databases/postgres.js')

const { SERVER_PUERTO } = process.env;
const puerto=SERVER_PUERTO || 3001;
let mensaje = "%s listening at "+puerto;

conn.sync({alter:false}).then(()=>{
  server.listen(puerto,()=>{
    console.log(mensaje.rainbow);
  })
})