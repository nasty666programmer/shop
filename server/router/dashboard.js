const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth')


router.get('/dashboard',auth,(req,res) => {
    res.json({
        user:req.user
    })
})

module.exports = router;