import Header from '../components/Header';
import useAutologout from './useAutologout';
export default function EtudiantDashboard() {

    useAutologout()//check l'etat de token tt les 3 sec

return (
        <div>
            <Header />
            <div className="p-6">Dashboard Etudiant</div>
        </div>
    );
}