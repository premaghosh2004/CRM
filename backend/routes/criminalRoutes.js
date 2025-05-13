const express = require('express');
const { registerCriminal, getCriminal, updateCriminalDetails, getAllCriminals, transferCriminal } = require('../controllers/criminalController');

const router = express.Router();
const {updateCriminalSentence} = require('../controllers/criminalController');
const {verifyJudgeToken} = require('../middlewars/authMiddlewar');


router.post('/register', registerCriminal);
router.get('/criminal', getCriminal);
router.get('/', getAllCriminals)
router.put('/update/:criminalId', updateCriminalDetails);
router.put('/updateSentence/:criminalId', updateCriminalSentence);
router.put('/transferCriminal/:criminalId', transferCriminal);

module.exports = router;
