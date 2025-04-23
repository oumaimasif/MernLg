const express = require("express");
const router = express.Router();

const { verifierToken, checkRole } = require("../middleware/auth");
const Admin = require("../models/Admin");

// Exemple de route pour les admins uniquement
router.get("/dashboard", verifierToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Bienvenue sur le tableau de bord de l'admin" });
});

// --/admin/
router.get("/",async(req,res)=>{
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
module.exports = router;