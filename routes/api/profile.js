const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/profile');
const User = require('../../models/User');
// @route  Get api/profile/me
// @desc   Test route
// @access public

router.get('/me', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;