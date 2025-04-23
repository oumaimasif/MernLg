const mongoose =require('mongoose')

const profSchema= new mongoose.Schema({
    nom:{type: String, required: true},
    email:{type:String, required:true, unique: true},
    matiere:{type: String, required: true},
    password:{type:String, required: true},
    role:{type:String, default:'prof'}
})

module.exports= mongoose.model('Prof', profSchema)