const auth = require('../../middleware/auth');
const User = require('../../models/User');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// @route  Get api/auth
// @desc   Test route
// @access public

router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
)


router.post('/', [
    check('email', 'Please include email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        //See if the User exist
        // Get users Gravatar
        // Encrypt password using Bcrypt
        // and return the jwt


        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});
module.exports = router;