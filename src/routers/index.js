const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/imgShow/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit', {filename : id});
});

router.post('/imgUp', (req, res) => {
    console.log(req.file);
    res.redirect(`/imgShow/${req.file.filename}`);
});


module.exports = router;