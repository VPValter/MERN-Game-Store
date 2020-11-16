const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); /* for default.json */
const {check,validationResult} = require('express-validator');

const User = require('../../models/User');

// @route GET   api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
    try {
        // Send the id, but exclude the password ?
        const user = await User.findById(req.user.id).select('-password').populate('gamesOwned', ['title', 'posterImg']);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route POST  api/auth
// @desc        Authenticate user & get token (login)
// @access      Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring req.body and pulling out a few things from there:
    const { email, password } = req.body;

    try {
        // See if user exists:
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors:[{msg: 'Invalid credentials'}] });
        }

        // Create the JWT payload:
        const payload = {
            user: {
                id: user.id
            }
        }

        // Matching the email & password - compare with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        // Sign the JWT token (*)
        jwt.sign(payload, config.get('jwtSecret'), { /* from default.json */
            expiresIn: 360000 /* change to 3600 (1h) for production */
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        }); 

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route PUT   api/auth
// @desc        Checkout
// @access      Private
router.put('/checkout', auth, async(req, res) => {
    try {

        let user = await User.updateOne(
            { _id: req.user.id },
            { $addToSet: { gamesOwned: { $each: req.body.gamesBought } } }
        )

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;