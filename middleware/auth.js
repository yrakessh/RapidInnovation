const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = await User.findById(decoded.user.id).select('-password');
        
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}