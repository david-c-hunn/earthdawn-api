var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TalentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    step: { type: String, required: true },
    base_attribute: { type: String, required: true, enum: ['DEX','STR','TOU','PER','WIL','CHA','none'] },
    action: { type: String, required: true },
    karma: { type: Boolean, required: true },
    strain: { type: String, required: true, enum: ['0','1','2','3','4','5','1+'] },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Talent', TalentSchema);