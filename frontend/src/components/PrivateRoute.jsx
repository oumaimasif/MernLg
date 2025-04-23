import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import IsTokenExpire from './IsTokenExpire';


export default function PrivateRoute({ children, allowedRoles }) {
    const token = localStorage.getItem('token');

    if (!token || !IsTokenExpire(token)) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);

        // Vérifie si le rôle est autorisé
        if (!allowedRoles.includes(decoded.role)) {
            return <Navigate to="/home" />; 
        }

        return children; // Autorisé, on affiche la page

    } catch (err) {
        console.error("Erreur de décodage du token", err);
        return <Navigate to="/home" />;
    }
}
