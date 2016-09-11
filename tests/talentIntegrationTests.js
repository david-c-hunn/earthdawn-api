var should = require('should'), request = require('supertest'),
    app = require('../app.js'), mongoose = require('mongoose'),
    Talent = mongoose.model('Talent'), agent = request.agent(app);

describe('Talent CRUD Test', function() {
    it('Should allow a talent to be posted and return an _id.', function(done) {
        var talentPost = {
            name: 'name',
            step: 'step',
            action: 'action',
            karma: false,
            strain: 0,
            description: 'description'
        };

        agent.post('/api/talents')
            .send(talentPost)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function (done) {
        Talent.remove().exec();
        done();
    })
});