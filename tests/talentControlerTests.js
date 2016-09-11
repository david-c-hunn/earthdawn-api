
var should = require('should'), sinon = require('sinon');

describe('Talent Controller Tests', function() {
    describe('post', function() {
        it('should not allow an empty name on post.', function() {
            var Talent = function(talent) { this.save = function() {} },
                req = {body: {name: ''}},
                res = {status: sinon.spy(), send: sinon.spy()},
                controller = require('../controllers/talentControler')(Talent);

            controller.post(req, res);
            res.status.calledWith(400).should.equal(
                true, 'bad status ' + res.status.args[0][0]);
        })
    })
})