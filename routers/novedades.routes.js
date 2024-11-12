const express = require('express');
const router = express.Router();
const controller = require("../controllers/novedades.controllers");

// GET

router.get('/', controller.all_novedades);

router.get('/:id_novedades', controller.show_novedades);


// POST

router.post('/', controller.store_novedades);


// PUT 

router.put('/:id_novedades', controller.update_novedades);


// DELETE 

router.delete('/:id_novedades', controller.destroy_novedades);


module.exports = router;