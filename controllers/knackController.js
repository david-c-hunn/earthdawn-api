
module.exports = function controller(Knack, Talent) {
    var base = require('./controller.js')(Knack);

    // called prior to bulk upload
    function addTalentIds(req, res, next) {
        function lookUpTalentIds(knackDataArr, idx) {
            var knackData = knackDataArr[idx]
                talent_name = knackData.talent_name,
                lastKnackIdx = knackDataArr.length - 1;

            Talent.findOne(
                {'name': talent_name}, '_id', function(error, talent) {
                    if (error) {
                        knackData.error = error;
                    } else if (talent) {
                        knackData.talent_id = talent._id;
                    } else {
                        knackData.error =
                            'talent name ' + talent_name + ' not found';
                    }
                    if (idx == lastKnackIdx) {
                        next();
                    } else {
                        lookUpTalentIds(knackDataArr, ++idx);
                    }
                });
        }

        lookUpTalentIds(req.body, 0);
    }

    return {
        addTalentIds: addTalentIds, post: base.post, get: base.get,
            bulkPost: base.bulkPost, findById: base.findById,
            getById: base.getById, putById: base.putById,
            patchById: base.patchById, deleteById: base.deleteById,
            deleteAllDocuments: base.deleteAllDocuments
    }
}
