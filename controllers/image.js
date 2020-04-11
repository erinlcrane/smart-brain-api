const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '382080f37437452e8b8b8f75c8deb5f2'
});

const handleApiCall = (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('did not work'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}