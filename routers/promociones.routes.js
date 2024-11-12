const express = require('express');
const router = express.Router();
const controller = require("../controllers/promociones.controllers");

// GET

router.get('/', controller.all_promociones);

router.get('/:id_promocion', controller.show_promociones);


// POST

router.post('/', controller.store_promociones);


// PUT 

router.put('/:id_promocion', controller.update_promociones);


// DELETE 

router.delete('/:id_promocion', controller.destroy_promociones);


module.exports = router;