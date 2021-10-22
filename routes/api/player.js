const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Player = require('../../models/Player')
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    try {
        let player = [];
        let condition = {};
        if(req.user.role === 'admin') {
            condition = {}
        } else if (req.user.role === 'coach') {
                condition.coach = req.user.id;
            if(req.query.name)
                condition.name = req.query.name;
            
            if(req.query.sport)
                condition.sport = req.query.sport;
        }
        player = await Player.find(condition).populate('coach',['name','email']).sort({ matches: -1 });
        res.json(player);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

router.post('/', auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('code', 'Unique Player Code is required').not().isEmpty(),
    check('matches', 'Please enter number in Matches PLayed').isDecimal(),
    check('won', 'Please enter number in matches won').isDecimal(),
    check('lost', 'Please enter number in matches lost').isDecimal(),
    check('team', 'Please enter team').not().isEmpty(),
    check('sport', 'Please enter sport').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, code, matches, won, lost, team, sport } = req.body;
    
    try {
        let player = await Player.findOne({ code });
        if(player) {
            return res.status(400).json({errors: [{msg: "Player Already Exists"}]});
        }

        player = new Player({name, code, matches, won, lost, team, sport, coach: req.user.id});
        await player.save();
        // player = await Player.findById(player._id).populate('coach',['name','email']);

        res.json(player)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;