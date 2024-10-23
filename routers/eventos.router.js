const express = require('express');
const router = express.Router();
const controller = require("../controllers/eventos.controllers");

// GET

router.get('/', controller.index);

router.get('/:id', controller.show);


// POST

router.post('/', controller.store);


// PUT 

router.put('/:id', controller.update);


// DELETE 

router.delete('/:id', controller.destroy);


module.exports = router;