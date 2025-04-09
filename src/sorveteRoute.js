const sorveteController = require('./sorveteController');

module.exports = (app) => {
    app.post('/sorvete', sorveteController.post);
    app.put('/sorvete/:id', sorveteController.put);
    app.delete('/sorvete/:id', sorveteController.delete);
    app.get('/sorvete', sorveteController.get);
    app.get('/sorvete/:id', sorveteController.getById);
};
