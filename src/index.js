const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination : path.join(__dirname, 'public/imagenes'),
    filename : (req, file, cb) => {
        let extname = path.extname(file.originalname);
        cb(null, Date.now() + extname);
    }
});

/******Configuraciones ******* */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*****Middlewares **********/
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    storage : storage,
    dest : path.join(__dirname, 'public/imagenes'),
    fileFilter : (req, file, cb) => {
        let typeFiles = /jpeg|jpg|png|gif/;
        let mimeType = typeFiles.test(file.mimetype);
        let extname = typeFiles.test(path.extname(file.originalname));
        if(mimeType && extname) {
            cb(null, true)
        } else {
            cb('Se debe subir una imágen válida')
        }
    },
    limits : { fileSize : 10 * 1024 * 1024 }
}).single('foto'));

app.use(require('./routers/index'));


/*****Servidor Escuchando */
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto : ', app.get('port'));
});