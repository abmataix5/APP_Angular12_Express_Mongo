var router = require('express').Router();
var mongoose = require('mongoose');

const Producto = require("../../models/producto");


console.log(Producto);

router.get("/", async (req, res) => {
    try {
      const products = await Producto.find();
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });

  module.exports = router;