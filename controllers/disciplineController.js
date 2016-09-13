
module.exports = function controller(Discipline, Talent) {
    var base = require('./controller.js')(Discipline);

    function get(req, res) {
        function joinWithTalents(disciplines, discIdx, talentIdx) {
            var discTalent = disciplines[discIdx].talents[talentIdx],
                lastDiscIdx = disciplines.length - 1,
                lastTalentIdx = disciplines[discIdx].talents.length - 1;

            Talent.findOne(
                {'_id': discTalent.talent_id}, function(error, talent) {
                    if (error) {
                        discTalent.error = error;
                    } else if (talent) {
                        for (var p in talent.toObject()) {
                            if (p != '_id') {
                                discTalent[p] = talent[p];
                            }
                        }
                    } else {
                        discTalent.error = 'talent_id not found';
                    }
                    if (discIdx == lastDiscIdx && talentIdx == lastTalentIdx) {
                        res.send(disciplines);
                    } else if (talentIdx == lastTalentIdx) {
                        joinWithTalents(disciplines, ++discIdx, 0);
                    } else {
                        joinWithTalents(disciplines, discIdx, ++talentIdx);
                    }
                });
        }

        Discipline.find(req.query, function(err, discplines) {
            if (err) {
                res.status(500).send(err);
            } else {
                var discObjs = [];
                discplines.forEach(function(element, index, array) {
                    discObjs.push(element.toObject());
                });
                joinWithTalents(discObjs, 0, 0);
            }
        });
    }

    // called prior to bulk upload
    function addTalentIds(req, res, next) {
        function lookUpThreadWeavingIds(discDataArr, idx) {
            var discData = discDataArr[idx],
                name = discData.threadweaving_talent;

            Talent.findOne({'name': name}, '_id', function(err, talent) {
                if (!err && talent) {
                    discData.threadweaving = talent._id;
                }
                if (++idx < discDataArr.length) {
                    lookUpThreadWeavingIds(discDataArr, idx);
                } else {
                    lookUpTalentIds(discDataArr, 0, 0);
                }
            });
        }

        function lookUpTalentIds(discData, discIdx, talentIdx) {
            var talentData = discData[discIdx].talents[talentIdx],
                numDiscs = discData.length,
                numTalents = discData[discIdx].talents.length;

            Talent.findOne(
                {'name': talentData.talent_name}, '_id',
                function(error, talent) {
                    if (error) {
                        talentData.error = error;
                    } else if (talent) {
                        talentData.talent_id = talent._id;
                    } else {
                        talentData.error = 'talent name ' +
                            talentData.talent_name + ' not found';
                    }
                    if (++talentIdx < numTalents) {
                        lookUpTalentIds(discData, discIdx, talentIdx);
                    } else if (++discIdx < numDiscs) {
                        lookUpTalentIds(discData, discIdx, 0);
                    } else {
                        next();
                    }
                });
        }

        lookUpThreadWeavingIds(req.body, 0);
    }

    return {
        addTalentIds: addTalentIds, post: base.post, get: get,
            bulkPost: base.bulkPost, findById: base.findById,
            getById: base.getById, putById: base.putById,
            patchById: base.patchById, deleteById: base.deleteById,
            deleteAllDocuments: base.deleteAllDocuments
    }
}
