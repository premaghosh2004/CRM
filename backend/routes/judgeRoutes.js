const express = require('express');
const { registerJudge, loginJudge, registerPolice, registerJailor } = require('../controllers/judgeControllers');

const router = express.Router();


router.post('/register-judge', registerJudge);
router.post('/register-police', registerPolice);
router.post('/register-jailor', registerJailor);


router.post('/login', loginJudge);

module.exports = router;
