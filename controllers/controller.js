
module.exports = function controller(ItemModel) {
    function post(req, res) {
        var item = new ItemModel(req.body);

        item.save(function(error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(201).send(item);
            }
        });
    }

    function bulkPost(req, res) {
        var result = {
            numInserts: 0,
            numFailues: 0,
            errors: [],
            errorInstances: []
        },
            count = req.body.length;

        function saveAll() {
            var item = new ItemModel(req.body.pop());

            item.save(function (error) {
                if (error) {
                    result.errors.push(error);
                    result.errorInstances.push(item);
                    result.numFailues++;
                } else {
                    result.numInserts++;
                }
                if (--count) {
                    saveAll();
                } else {
                    res.send(result);
                }
            });
        }

        saveAll();
    }

    function get(req, res) {
        ItemModel.find(req.query, function(err, items) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(items);
            }
        });
    }

    function findById(req, res, next) {
        ItemModel.findById(req.params.itemid, function(err, item) {
            if (err) {
                res.status(500).send(err);
            } else if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).send('no item found');
            }
        });
    }

    function getById(req, res) { res.send(req.item); }

    function putById(req, res) {
        for (var p in req.body) {
            if (p != '_id') {
                req.item[p] = req.body[p];
            }
        }
        req.item.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.item);
            }
        });
    }

    function patchById(req, res) {
        for (var p in req.body) {
            if (req.body[p] && p != '_id') {
                req.item[p] = req.body[p];
            }
        }
        req.item.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.item);
            }
        });
    }

    function deleteById(req, res) {
        req.item.remove(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    }

    function deleteAllDocuments(req, res) {
        ItemModel.remove({}, function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send('All items deleted from ' + ItemModel.collection.name);
            }
        });
    }

    return {
        post: post, get: get, bulkPost: bulkPost, findById: findById,
            getById: getById, putById: putById, patchById: patchById,
            deleteById: deleteById, deleteAllDocuments: deleteAllDocuments
    }
}
