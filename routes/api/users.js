const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); /* for default.json */
const {check,validationResult} = require('express-validator');

const User = require('../../models/User');

// @route       POST  api/users
// @desc        Register user
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring req.body and pulling out a few things from there:
    const {name, email, password} = req.body;

    try {
        // See if user exists:
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors:[{msg: 'User already exists'}] });
        }

        // Get the user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password
        });

        // Encrypt password:
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user in the db:
        await user.save();

        // Create the JWT payload:
        const payload = {
            user: {
                id: user.id
            }
        }

        // Sign the JWT token (*)
        jwt.sign(payload, config.get('jwtSecret'), { /* from default.json */
            expiresIn: 3600000 /* change to 3600 (1h) for production */
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        }); 

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;