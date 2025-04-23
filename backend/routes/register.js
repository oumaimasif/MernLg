const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Prof = require("../models/Prof");
const Etudiant = require("../models/Etudiant");

//route pour inscription (admin , prof, etudiant)
router.post("/admin", async (req, res) => {
  const { nom, email, password } = req.body;
  try {
    const IsAdmin = await Admin.findOne({ email });
    if (IsAdmin)
      return res.status(400).json({ msg: "Admin existe déjà avec ce mail" });

    const salt = await bcrypt.genSalt(10);
    //hasher le motde passe
    const hashePassword = await bcrypt.hash(password, salt); // bcrypt.hash transforme le Pw en ss forme chiffré(longue chaine alphanumerique #stocker cela ds db )

    //creer l'Admin
    const newAdmin = new Admin({ nom, email, password: hashePassword });
    await newAdmin.save();

    res.status(201).json({ msg: "Admin crée" });
  } catch (err) {
    console.error("Erreur /register/admin →", err);
    res.status(500).json({ msg: err.message });
  }
});

//add prof
router.post("/prof", async (req, res) => {
  const { nom, email, matiere, password } = req.body;
  try {
    const IsProf = await Prof.findOne({ email });
    if (IsProf) return res.status(400).json({ msg: "Prof existe déjà " });

    const salt = await bcrypt.genSalt(10); // Génère un salt sécurisé
    const hashePassword = await bcrypt.hash(password, salt); //chifre mdp

    const newProf = new Prof({ nom, email, matiere, password: hashePassword }); // enregistre long password
    await newProf.save();

    res.status(201).json({ msg: "Prof créer" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//add etudiant
router.post("/etudiant", async (req, res) => {
  const { nom, email, filiere, password } = req.body;
  console.log("Reçu depuis le front :", req.body); 

  try {
    const IsEtudiant = await Etudiant.findOne({ email });
    if (IsEtudiant)
      return res.status(400).json({ msg: "Etudiant existe déjà" });

    const salt = await bcrypt.genSalt(10); // Génère un salt sécurisé
    const hashePassword = await bcrypt.hash(password, salt);

    // console.log(
    //   "Mot de passe haché :",
    //   salt + " passwordE: " + password + " hashePassword: " + hashePassword
    // );

    const newEtudiant = new Etudiant({
      nom,
      email,
      filiere,
      password: hashePassword,
    });
    await newEtudiant.save();

    res.status(201).json({ msg: "Etudiant créé avec succès" });
  } catch (error) {
    res.status(500).json({ msg:  error.message });
  }
});
module.exports = router;
