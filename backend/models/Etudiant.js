const mongoose =require('mongoose')

const etudiantSchema= new mongoose.Schema({
    nom:{type: String, required: true},
    email:{type:String, required:true, unique: true},
    filiere:{type: String, required: true},
    password:{type:String, required: true},
    role:{type:String, default:'etudiant'}
})

module.exports= mongoose.model('Etudiant', etudiantSchema)