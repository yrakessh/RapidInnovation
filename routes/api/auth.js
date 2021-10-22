const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const config = require('config')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    try {
        if(req.user.role === 'admin') {
            const user = await User.find().select('-password');
            res.json(user);
        } else {
            return res.status(400).json({errors: [{ msg: "User Unauthorized" }]})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({errors: [{ msg: "Invalid Credentials" }]})
        }

        const payload = {
            user:{ id:user.id }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token) => {
            if(err) throw err;
            res.json({token})
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;