const express = require('express')

const router = express.Router();

const users = require('./users');
const climas = require('./climas')

router.use("/",users);
router.use("/",climas)

module.exports= router;