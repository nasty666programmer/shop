module.exports = function (req,res,next) {
    console.log('session',req.session)
    console.log('isAuth: ',req.session.isAuthenticated)
    if (!req.session.isAuthenticated) {
        return res.json({
            redirect:'/auth/sign-in'
        })
    }
  
    next();
}