const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User')
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

module.exports = router;