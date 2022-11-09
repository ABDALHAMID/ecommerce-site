const db = require('../dbconection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports.signUp = (req, res) => {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone ;
    const birthday = req.body.birthday;

    qr = `select email from user where email = '${email}' `
    db.query(qr, (err, result) => {
        if (err) return console.log(err);
        if (result.length > 0) {
            res.send({
                status: false,
                msg: 'user alridy exist'
            })
        }
        else {
            function generateHash(password){
                const salt=bcrypt.genSaltSync(12);
                const hash=bcrypt.hashSync(password,salt);
                return hash;
            }
            let hashedPwd = generateHash(password)
        let insertUser = `insert into user (first_name,last_name,email,password,phone,birthday) values('${first_name}','${last_name}','${email}','${hashedPwd}','${phone}','${birthday}')`
            db.query(insertUser, (err, result) => {
                if (err) throw err;
                res.send({
                    status: true,
                    msg: 'user have been added'
                })
            })
        }
    })
}


module.exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    

    qr = `select * from user where email = '${email}'`
    db.query(qr,(err,result) => {
        console.log(result)
        if(err)throw err;
        if(result.length > 0)
        {
            let checkPwd = bcrypt.compareSync(password, result[0].password)
            if(checkPwd)
            {
                let data = {
                    id:result[0].Id_user,
                    userName:result[0].userName,
                    email:result[0].email,
                    password:result[0].password,
                    phone:result[0].phone,
                    user_img:result[0].user_img,
                    first_name:result[0].first_name,
                    last_name:result[0].last_name,
                    address:result[0].address,
                    about:result[0].about,
                    birthday:result[0].birthday,
                }
                let token = jwt.sign({data},'privateKey',{expiresIn:"8h"})
                res.send({
                    userEx:true,
                    status:true,
                    token:token,
                    user:data
                })
                console.log('USER LOGIN')
            }
            else
            {
                res.send({
                    userEx:true,
                    status:false,
                    msg:'password not corect'
                })
                console.log('PASSWORD INCORECT')
            }
        }
        else{
            res.send({
                msg:'user not exist',
                userEx:false
            })
            console.log('user dose not exist')
        }
    })

}

module.exports.getUserLog = (req,res) =>{
    token = req.token
    
    if(token)
    {
        let checkToken = tokenValid(token)
        
        if(checkToken) var data =  jwt.verify(token,'privateKey')
        res.send({
            status:checkToken,
            user:data
        })
    }
}
function tokenValid(token){
    return jwt.verify(token,'privateKey',(err)=>{
        if(err)
        {
            console.log("token not valide")
            return false
        }
        else
        {
            console.log('token valide')
            return true
        }
    });
}
module.exports.sendMessage = (req,res) =>{
    let  name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    let msg = req.body.message

    qr=`insert into messages (name,email,phone,message) values('${name.replace(/'/g,"\\'")}','${email}','${phone}','${msg.replace(/'/g,"\\'")}')`
    db.query(qr,(err,result)=>{
        if(err)throw err
        res.send({
            status:true,
            result:result
        })
    })
}