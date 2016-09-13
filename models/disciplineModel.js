var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var defenseBonus = new Schema({
    circle: { type: Number, required: true },
    defense: { type: String, required: true, enum: ['Spell', 'Physical', 'Social'] },
    bonus: { type: Number, required: true }
});

var karmaRoll = new Schema({
    circle: { type: Number, required: true },
    test_type: { type: String, required: true } 
});

var disciplineTalent = new Schema({
    circle: { type: Number, required: true},
    talent_id: { type: Schema.Types.ObjectId, required: true },
    talent_type: { type: String, required: true, enum: ['discipline', 'optional'] }
});

var disciplineAbility = new Schema({
    circle: { type: Number, required: true},
    name: { type: String, required: true },
    description: { type: String, required: true}
});

var DisciplineSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    important_attributes: { type: String },
    karma_ritual: { type: String, required: true },
    half_magic: { type: String, required: true },
    durability: {
        unconscious: { type: Number, required: true },
        death: { type: Number, required: true }
    },
    talents: [disciplineTalent],
    threadweaving: { type: Schema.Types.ObjectId, required: true },
    defense_bonuses: [defenseBonus],
    karma_rolls: [karmaRoll]
});

module.exports = mongoose.model('Discipline', DisciplineSchema);