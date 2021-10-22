const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    code: { type: String, required: true, unique: true},
    matches: { type: Number, required: true},
    won: { type: Number, required: true},
    team: { type: String, required: true},
    sport: { type: String, required: true},
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = Player = mongoose.model('Player', PlayerSchema);