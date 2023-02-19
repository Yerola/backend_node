const colors = require('colors');
const { Router } = require('express');
const express = require('express');
const modelos = require('../databases/postgres');

const cors= require('cors');

const router = Router();
router.use(cors());
router.use(express.json())

//*ruta de prueba
router.get("/test",(req,res)=>{
  console.log("entramos a la ruta".bgYellow)
  try {
    res.status(200).send("todo ok con tu ruta")
  } catch (error) {
    res.status(400).send("no se encontró la ruta")
  }
})

//*agrega ususario nuevo
router.post("/addUser",async (req,res)=>{
  try {
    const { nombre, apellido }= req.body
    const [newUser,created]= await modelos.Users.findOrCreate({
      where:{firstName:nombre},
      defaults:{
        firstName:nombre,
        lastName:apellido
      }
    });
    created ? res.status(200).send("Usuario creado") : res.status(400).send("no se agregó el usuario");
  } catch (error) {
    console.error(error)
  }
});

//*trae todos los usuarios
router.get("/users",async (req,res)=>{
  try {
    const allusers = await modelos.Users.findAll({ raw: true, });
    if (allusers.length>0) {
      res.status(200).json(allusers)
    }else{
      res.status(200).send("no hay datos")
    }
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;