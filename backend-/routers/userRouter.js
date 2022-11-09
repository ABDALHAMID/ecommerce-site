const express = require('express');
const router = express.Router();
const controler = require('../controlers/userControler')


router.post('/signUp',controler.signUp)
router.post('/logIn',controler.logIn)
router.post('/getLogInfo',requireToken,controler.getUserLog)
router.post('/sendMessage',controler.sendMessage)

function requireToken(req,res,next){
    token = req.body.token
    if( token === undefined || token == "" || token === null)
    {
        res.send({
            status:false,
            msg:'token require..'
        })
    }
    else
    {
        req.token = token;
        next();
    }
}


module.exports = router;
