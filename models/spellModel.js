var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpellSchema = new Schema({
    name: { type: String, required: true, unique: true },
    discipline: {
        type: String, required: true,
        enum: ['Elementalist', 'Nethermancer', 'Wizard', 'Illusionist']
    },
    circle: { type: Number, required: true },
    threads: { type: Number, required: true },
    weave: { type: Number, required: true },
    snap: { type: Number, required: true },
    target: { type: String, required: true },
    range: { type: String, required: true },
    duration: { type: String, required: true },
    aoe: { type: String },
    effect: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Spell', SpellSchema);