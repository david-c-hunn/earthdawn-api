var express = require('express');

module.exports = function routes(ItemModel) {
    var router = express.Router();
    var controller = require('../controllers/controller.js')(ItemModel);

    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    router.route('/').post(controller.post).get(controller.get);

    router.route('/bulk').post(controller.bulkPost);

    router.route('/delete_all').delete(controller.deleteAllDocuments);

    router.use('/:itemid', controller.findById);

    router.route('/:itemid')
        .get(controller.getById)
        .put(controller.putById)
        .patch(controller.patchById)
        .delete(controller.deleteById);

    return router;
}
