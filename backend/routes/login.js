//login multi_roles(3)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");//bibliothèque qui permet de générer et vérifier les JWT (JSON Web Token)

const Admin = require("../models/Admin");
const Prof = require("../models/Prof");
const Etudiant = require("../models/Etudiant");

//chercher un user dans les 3 modeeles
async function findByEmail(email) {
  const admin = await Admin.findOne({ email });
  if (admin) return { user: admin, role: "admin" };

  const prof = await Prof.findOne({ email });
  if (prof) return { user: prof, role: "prof" };

  const etudiant = await Etudiant.findOne({ email });
  if (etudiant) return { user: etudiant, role: "etudiant" };

  return null;
}

router.post("/", async (req, res) => {
  const { email, password } = req.body; //extrait email & password
  console.log("Requête login reçue:", req.body); 
  try {
    const result = await findByEmail(email); // renvoie{ user, role} || null
    console.log("Result: ", result);
    if (!result) return res.status(400).json({ msg: "Utilisateur non trouvé" });
    console.log("result: ",result);
    const { user, role } = result;
    console.log("User: ", user);
    //compare password envoyé & password hashé
    const IsMtach = await bcrypt.compare(password, user.password);
    if (!IsMtach)
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    
    //la generalisation du token Jwt
      //ici en genere un token qui contient _id/ et le role et il va etre expirer dans 50s
    const token = jwt.sign({ id: user._id, role, nom:user.nom }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    //reponse json envoyer (token , objet user{} utile pour le frontend sache qui est connecté)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        role:role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
