import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
    const [valide, setValide] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')
    const [password2, setPassword2] = useState("")
    const [role, setRole] = useState('admin'); // Valeur par défaut
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        matiere: '',
        filiere: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== password2) {
            setErrorMsg("Les mots de passe ne correspondent pas.");
            setTimeout(() => setErrorMsg(""), 3000)
            return
        }
        if (!formData.nom || !formData.email || !formData.password) {
            setErrorMsg("Veuillez remplir tous les champs obligatoires.");
            setTimeout(() => setErrorMsg(""), 3000);
            return;
        }

        try {
            await axios.post(`http://localhost:3002/register/${role}`, formData);
            setValide(true)
            setTimeout(() => {
                setValide(false)
            }, 2000);
            //si en fini en retourne a la page login 
            setTimeout(() => {
                navigate('/login')
            }, 3000);
            // const data = await response.json();//nn oblige
            // alert(data.message || 'Inscription réussie !');
            alert('Inscription réussie !');
        } catch (err) {
            console.error('Erreur:', err);
            setErrorMsg('Une erreur est survenue lors de l’inscription.');
            setTimeout(() => setErrorMsg(''), 3000);
        }


    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
            <h2 className="text-xl font-bold">Inscription</h2>

            <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded p-2">
                <option value="admin">Admin</option>
                <option value="prof">Prof</option>
                <option value="etudiant">Étudiant</option>
            </select>

            <input type="text" value={formData.nom} name="nom" placeholder="Nom" onChange={handleChange} className="w-full border rounded p-2" />
            <input type="email" value={formData.email} name="email" placeholder="Email" onChange={handleChange} className="w-full border rounded p-2" />
            <input type="password" value={formData.password} name="password" placeholder="Mot de passe" onChange={handleChange} className="w-full border rounded p-2" />
            <input type="password" value={password2} name="password2" placeholder="Mot de passe de Confirmation" onChange={(e) => setPassword2(e.target.value)} className="w-full border rounded p-2" />

            {role === 'prof' && (
                <input type="text" value={formData.matiere} name="matiere" placeholder="Matière" onChange={handleChange} className="w-full border rounded p-2" />
            )}

            {role === 'etudiant' && (
                <input type="text" name="filiere" value={formData.filiere} placeholder="Filière" onChange={handleChange} className="w-full border rounded p-2" />
            )}

            {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
            {valide && <p className='text-green-500'>Inscription réussie, redirection...</p>}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">S'inscrire</button>
        </form>
    );
}