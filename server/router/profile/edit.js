const {Router} = require('express');
const router = Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const {editProfile} = require('../../utils/validator');
const {validationResult} = require('express-validator'); 
const multer = require('multer')


router.post('/edit/photo',async(req,res) => {
    try {
        console.log('file',req.file)

        let candidate = await User.findById(req.user._id);
       if (candidate) {
           if (req.file) {
            req.user.img = req.file.path 
            candidate.avatarUrl = req.file.path
           }
       }
       await candidate.save()
       res.json({
           redirect:'/dashboard'
       })
        
    }catch(err) {
        console.log(err)
    }
})

router.post('/edit',async(req,res) => {
    try{
        const {name,password,img} = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({
                message:error.array()[0].msg
            })
        }

        let candidate = await User.findById(req.user._id);
        const hashPassword = await bcrypt.hash(password,10);
       if (candidate) {
            
           candidate.name = name;
           candidate.password = hashPassword;
            req.user.name = name;
           req.user.password = hashPassword;
           
        }
        await candidate.save();
        res.json({
            redirect:'/dashboard'
        })
        // console.log('profile',req.body)
    }catch(err) {
        console.log(err)       
    }
})

module.exports = router;