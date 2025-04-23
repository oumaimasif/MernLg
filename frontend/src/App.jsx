import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import ProfDashboard from './pages/ProfDashboard';
import EtudiantDashboard from './pages/EtudiantDashboard';
import PrivateRoute from './components/PrivateRoute';
import { Link } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
            <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={< RegisterForm/>} />

        {/* Routes protégées */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/prof-dashboard"
          element={
            <PrivateRoute allowedRoles={['prof']}>
              <ProfDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/etudiant-dashboard"
          element={
            <PrivateRoute allowedRoles={['etudiant']}>
              <EtudiantDashboard />
            </PrivateRoute>
          }
        />

        {/* Tu peux aussi ajouter une page d'erreur ici */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      </Router>
    
  );
}
