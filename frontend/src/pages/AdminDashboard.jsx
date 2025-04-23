import useAutologout from './useAutologout';
import Header from '../components/Header';

export default function AdminDashboard() {
    useAutologout()//check l'etat de token tt les 3 sec
    return (
        <div>
            <Header />
            <div className="p-6">Dashboard Admin</div>
        </div>
    );
}