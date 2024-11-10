const express = require('express');
const router = express.Router();

// MULTER 
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'img_productos');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});



const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});




const controller = require("../controllers/productos.controllers");

// GET

router.get('/', controller.all_productos);

router.get('/:id', controller.show_productos);


// POST

router.post('/',upload.single("imagen_url"), controller.store_productos);


// PUT 

router.put('/:id', controller.update_productos);


// DELETE 

router.delete('/:id', controller.destroy_productos);


module.exports = router;