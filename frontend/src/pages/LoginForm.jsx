import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3002/login`, { email, password });
            console.log(email, password)
            const { token, user } = response.data;

         
  if(token)
  {
    localStorage.setItem('token', token);//saunvegarder le token dans LocaStorage token+ les info user

    const decoded = jwtDecode(token);

    //  redirection selon le role
    if (decoded.role === "admin") {
        navigate("/admin-dashboard");  // Page Admin
    } else if (decoded.role === "prof") {
        navigate("/prof-dashboard");  // Page Prof
    } else if (decoded.role === "etudiant") {
        navigate("/etudiant-dashboard");  // Page Étudiant
    }
  }else{
    console.log("Token non reçu!")
  }

        } catch (error) {
            console.error("Erreur lors de la connexion: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow- rounded space-y-4">
                <h2 className="text-xl font-bold">Connexion</h2>
                <div >
                    <label className='block m-2'>Email </label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2" autoComplete='off' required />
                </div>
                <div>
                    <label className='block m-2'>Mot de passe </label>
                    <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2" autoComplete='off' required />

                </div>
                <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded">Se connecter</button>
                <div className='mt-4'> Créer un compte <Link to="/register" className='text-sm text-blue-400'> s'inscrire</Link></div>
            </form>
        </div>

    );
}
