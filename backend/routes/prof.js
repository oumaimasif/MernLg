const express = require('express');
const router = express.Router();

const { verifierToken, checkRole } = require('../middleware/auth');

// Exemple de route pour les profs uniquement
router.get('/matiere', verifierToken, checkRole(['prof']), (req, res) => {
  res.json({ message: 'Accès aux matières réservé aux profs' });
});

module.exports = router;