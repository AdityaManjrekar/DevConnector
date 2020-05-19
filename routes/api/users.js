const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
// @route  Post api/users
// @desc   Register user
// @access public

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include email')
        .isEmail(),
    check('password', 'Please enter a password greater than six character')
        .isLength({ min: 6 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name, email, password, avatar
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        //See if the User exist
        // Get users Gravatar
        // Encrypt password using Bcrypt
        // and return the jwt
        res.send('User Registered');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;