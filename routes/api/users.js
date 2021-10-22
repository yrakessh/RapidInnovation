const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

// @router POST api/users
// @desc Register User
// @access public
/* Request Body
{
    "name": "Rakesh Yadav",
    "email": "yrakessh@gmail.com",
    "password": "1234567",
    "role": "admin"
} 

{
    "name": "Ravi Sashtri",
    "email": "ravi@gmail.com",
    "password": "1234567",
    "role": "coach"
}

Response: - 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MjI0MzNlZTVmMDVlMjAwYTA1NzkzIn0sImlhdCI6MTYzNDg3MTg0MywiZXhwIjoxNjM1MjMxODQzfQ.vOjyP_A22gWi1LolhxFiSey8c5lt5I8D3niiRxlY5iI"
}
*/
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, role, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({errors: [{msg: "User Already Exists"}]});
        }

        user = new User({name, email, role, password});
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
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