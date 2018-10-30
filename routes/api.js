const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

const db = "mongodb://amith:amithreddy1!@ds145053.mlab.com:45053/poc"

mongoose.connect(db, err =>{
    if(err){
        console.log('Error! '+ err)
    }else{
        console.log('Connected to Mongodb')
    }
})

router.get('/api', function(req, res){
    res.send('Response from API')
})
router.post('/register', function(req, res){
    let userData  = req.body
    let user = new User(userData)
    user.save(function(error, registeredUser){
        if(error){
            console.log(error)
        }else{
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', function(req, res){
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) =>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                }else{
                    res.status(200).send(user)
                }
            }
        }
    })

})

module.exports = router