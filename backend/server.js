const express = require("express")
const mongoose = require("mongoose")
const cors =require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001


app.use(cors());
app.use(express.json())

//connexion mongoDb
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("CONNECTE avec succée"))
.catch(err=>console.log("Erreur: ",err))

// app.get("/",(req,res)=>{
//     res.send("Serveur opérationnel !")
// })

const loginRoutes= require('./routes/login')
const registerRoutes= require('./routes/register')

app.use('/login',loginRoutes);
app.use('/register',registerRoutes);

const adminRoutes = require('./routes/admin');
const profRoutes = require('./routes/prof');
const etudiantRoutes = require('./routes/etudiant');

app.use('/admin', adminRoutes);
app.use('/prof', profRoutes);
app.use('/etudiant', etudiantRoutes);

//démarrage du serveur
app.listen(PORT,()=>{
    console.log(`Serveur démarré sur le port ${PORT}`)
})