const User = require('../models/user');



module.exports = async function(req,res,next){
    if(!req.session.user) {
        
        return next();
    }
    console.log('exit')
    req.user = await User.findById(req.session.user._id);
    console.log('session middleware',req.user)
     next();
}