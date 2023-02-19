const colors = require('colors');

console.log("entramos en postgres".bgMagenta);

require('dotenv').config();
const { Sequelize }= require('sequelize');
const fs = require('fs');
const path = require('path')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME }= process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  logging: false,
  native: false,
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.".bgGreen);
  })
  .catch((err) => {
    console.error("No se puede conectar a la base de datos:".bgRed, err);
  });

  const basename = path.basename(__filename);
  const modelDefiners = [];

  // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    let rutaNoLiteral = path.join(__dirname, "../models", file);
    let argumento = require(rutaNoLiteral);
    modelDefiners.push(argumento);
  });

  modelDefiners.forEach((model) => model(sequelize));
  const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const modelos = sequelize.models;
console.log("<<<<<<<<<<<modelos>>>>>>>>>>>".bgBlue);
console.log(modelos);
console.log("<<<<<<<<<<<fin modelos>>>>>>>>>>>".bgBlue);
//** ACÁ TENEMOS QUE COLOCAR LAS RELACIONES ENTRE TABLAS SEGÚN SEQUELIZE*/

module.exports={
  ...modelos,
conn:sequelize,
}