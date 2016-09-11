var express = require('express');

module.exports = function routes(Discipline, Talent) {
    var router = express.Router();
    var controller = require('../controllers/disciplineController.js')(Discipline, Talent);

    router.route('/').post(controller.post).get(controller.get);

    router.use('/bulk', controller.addTalentIds);
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
