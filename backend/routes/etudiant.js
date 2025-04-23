
const express = require('express');
const router = express.Router();

const { verifierToken, checkRole } = require('../middleware/auth');

// Exemple de route pour les profs uniquement
router.get('/filiere', verifierToken, checkRole(['etudiant']), (req, res) => {
  res.json({ message: 'Accès aux filieres réservé aux etudiants' });
});

// --/etudiant/
router.get("/",async(req,res)=>{
    try {
        const etudiants = await Admin.find();
        res.status(200).json(etudiants);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
module.exports = router;