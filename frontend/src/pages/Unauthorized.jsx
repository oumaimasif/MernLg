import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">⛔ Accès refusé</h1>
      <p className="text-lg text-gray-700 mb-6">
        Vous n’avez pas la permission d’accéder à cette page.
      </p>
      <Link
        to="/login"
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        Retour à la connexion
      </Link>
    </div>
  );
}
