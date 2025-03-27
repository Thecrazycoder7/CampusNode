const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

const router = require('express').Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

router.post('/logout', (req, res) => {
    res.send("Logout success");
})

module.exports = router;