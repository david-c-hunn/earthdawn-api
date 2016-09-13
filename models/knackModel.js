var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KnackSchema = new Schema({
    name: { type: String, required: true },
    talent_id: { type: Schema.Types.ObjectId, required: true },
    rank: { type: Number, required: true},
    strain: { type: String, required: true, enum: ['0','1','2','3','4','5','6','0+','1+','2+','see text'] },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Knack', KnackSchema);