const express = require('express');
const Users = require('../model/users');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Auth = require('../classes/Authorization');


const authorize = new Auth();


//DEVELOPMENT ONLY:
//list users
router.get('/users', authorize.clearance(['BASIC']), async (req, res) => {

    try 
    {
        const users = await Users.find();

        res.json(users);

    } catch (err) {
        res.status(400).json({message: err.message });
    }

});

//clear
router.get('/clean', async (req, res) => {

    try 
    {
        const users = await Users.deleteMany();

        res.json(users);

    } catch (err) {
        res.status(400).json({message: err.message });
    }

});


// create new user

router.post('/new', async (req, res) => {

    try 
    {
        const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const user = new Users ({
            name: req.body.name,
            username: req.body.username,
            password_hash :  hashpassword,
            clearance : 'BASIC'
           });

        const verify = await Users.findOne({  username : req.body.username });          
        
        if (verify != null ) {
            res.status(400).json({message: 'Username taken' });
        } else {

            let newUser = await user.save();
            //newUser.password = req.body.password;
            newUser = newUser.toObject();

            delete newUser.password_hash;
            delete newUser.__v;
            newUser.id = newUser._id;
            delete newUser._id;
            newUser.password = req.body.password;

    
            res.status(201).json(newUser);

        }

    } catch (err) {
        res.status(400).json({message: err.message });
    }

});



// login requests an authorization token

router.post('/login', async (req, res) => {

    let user;
    const requsername = req.body.username;
    

    try 
    {


        //const salt = await bcrypt.genSalt();

        user = await Users.findOne({  username : requsername });          

        if (user == null ) {
            res.status(404).json({ message: 'Invalid User'}); 
        } else {

            //const reqpassword = await bcrypt.hash(req.body.password, user.password_salt);
            //reqpassword == user.password_hash
            
            if (await bcrypt.compare(req.body.password, user.password_hash) ) {
                //user exists and password matches
                //register and return authorization TOKEN
                
                user = user.toObject();

                delete user.password_hash;
                delete user.__v;
                user.id = user._id;
                delete user._id;
                //newUser.password = req.body.password;
                const aToken = jwt.sign(user, process.env.JWT_SECRET);

                //var decoded = jwt.verify(aToken, process.env.JWT_SECRET);
                //console.log(decoded);

                res.setHeader("Authorization", aToken);
                res.setHeader("Set-Cookie", "Token="+aToken);
                res.status(200).json({ message: 'Authorized'});

            } else {
                // user exists but password does not match
                res.status(404).json({ message: 'Invalid Password'}); 
            }

            
        }

    } catch (err) {
        res.status(400).json({message: err.message });
    }

});

// logout dismisses an authorization token

router.post('/logout', async (req, res) => {

    try 
    {
 
    } catch (err) {
        res.status(400).json({message: err.message });
    }

});
 





module.exports = router;