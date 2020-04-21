const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

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
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    res.send('User Route')
});

module.exports = router;