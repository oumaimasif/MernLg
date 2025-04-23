import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDashboard = () => {
        if (userRole === 'admin') navigate('/admin-dashboard');
        else if (userRole === 'prof') navigate('/prof-dashboard');
        else if (userRole === 'etudiant') navigate('/etudiant-dashboard');
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <button className="text-xl font-bold text-orange-500 " onClick={()=> navigate("/home")}>MyApp</button>
            
            {userRole ? (
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        Mon compte
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-48">
                            <button
                                onClick={handleDashboard}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Mon Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                    Se connecter
                </button>
            )}
        </header>
    );
}
