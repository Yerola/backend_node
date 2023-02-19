const { Router } = require('express');
const express = require('express');
const axios = require('axios');

const cors= require('cors');

const router = Router();

router.use(cors());
router.use(express.json())

router.get("/trae_ciudad/:ciudad",async (req,res)=>{
  try {
    const apiKey = "ba609d4f3dcef0af6363c2c5fc5eba3f";
    let { ciudad } = req.params;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    //! http://localhost:3001/api/trae_ciudad/cordoba
    //gris
    //*verde 
    //!rojo
    //?azul
    //TODO
    //💛💛
    
    const apiUrl = await axios.get(api);

    return res.status(200).json(apiUrl.data);
  } catch (error) {
    console.error(error)
  }
})

module.exports=router;