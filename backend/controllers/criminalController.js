const Criminal = require('../models/Criminal');


const registerCriminal = async (req, res) => {
    try {
        const { name, age, crimeType, jailName, cellNo, sentence } = req.body;

      
        const newCriminal = new Criminal({
            name,
            age,
            crimeType,
            jailName,
            cellNo,
            sentence
        });

       
        const savedCriminal = await newCriminal.save();

       
        res.status(201).json({
            message: 'Criminal registered successfully',
            criminal: savedCriminal,
        });
    } catch (error) {
        console.error('Error registering criminal:', error.message);
        res.status(500).json({ message: 'Failed to register criminal', error: error.message });
    }
};

const getCriminal = async (req, res) => {
    try {
        const { cellNo, jailName } = req.body;

        
        const criminal = await Criminal.findOne({ cellNo, jailName });

        if (!criminal) {
            return res.status(404).json({ message: 'Criminal not found' });
        }

        res.status(200).json({ criminal });
    } catch (error) {
        console.error('Error fetching criminal:', error.message);
        res.status(500).json({ message: 'Failed to fetch criminal', error: error.message });
    }
};

const getAllCriminals = async (req, res) => {
    try {
      const criminals = await Criminal.find(); 
      res.status(200).json(criminals); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching criminals', error: error.message });
    }
  };
  

const updateCriminalDetails = async (req, res) => {
    try {
        const { criminalId } = req.params; 
        const updates = req.body; 

        
        const updatedCriminal = await Criminal.findByIdAndUpdate(criminalId, updates, { new: true });

        if (!updatedCriminal) {
            return res.status(404).json({ message: 'Criminal not found' });
        }

        res.status(200).json({
            message: 'Criminal details updated successfully',
            criminal: updatedCriminal,
        });
    } catch (error) {
        console.error('Error updating criminal:', error.message);
        res.status(500).json({ message: 'Failed to update criminal details', error: error.message });
    }
};

const updateCriminalSentence = async (req, res) => {
    try {
        const { criminalId } = req.params;
        const { sentence } = req.body;

        const updatedCriminal = await Criminal.findByIdAndUpdate(
            criminalId,
            { sentence },
            { new: true }
        );

        if (!updatedCriminal) return res.status(404).json({ message: 'Criminal not found' });

        res.status(200).json({
            message: 'Criminal sentence updated successfully',
            criminal: updatedCriminal,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sentence', error: error.message });
    }
};

const transferCriminal = async (req, res) => {
    try {
        const { criminalId } = req.params;
        const { newJail, cellNo } = req.body;

        const criminal = await Criminal.findByIdAndUpdate(
            criminalId,
            { jailName: newJail, cellNo },
            { new: true }
        );

        if (!criminal) return res.status(404).json({ message: 'Criminal not found' });

        res.status(200).json({ message: 'Criminal transferred successfully', criminal });
    } catch (error) {
        res.status(500).json({ message: 'Error transferring criminal', error: error.message });
    }
};

module.exports = { registerCriminal, getCriminal, updateCriminalDetails, updateCriminalSentence, getAllCriminals, transferCriminal };
