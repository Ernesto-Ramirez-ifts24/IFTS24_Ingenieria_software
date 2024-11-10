const express = require('express');
const router = express.Router();
const controller = require("../controllers/categorias.controllers");

// GET

router.get('/', controller.all_categorias);

router.get('/:id_categoria', controller.show_categorias);


// POST

router.post('/', controller.store_categorias);


// PUT 

router.put('/:id_categoria', controller.update_categorias);


// DELETE 

router.delete('/:id_categoria', controller.destroy_categorias);


module.exports = router;