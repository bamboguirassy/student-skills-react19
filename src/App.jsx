import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import EtudiantListPage from "./pages/EtudiantListPage";
import HomePage from "./pages/HomePage";
import EtudiantDetailsPage from "./pages/EtudiantDetailsPage";
import { EtudiantProvider } from "./providers/EtudiantProvider";

function App() {
  return (
    <>
      <EtudiantProvider>
        <Routes>
          {/* Layout parent */}
          <Route element={<AppLayout />}>
            {/* Pages enfants */}
            <Route path="/" element={<HomePage />} />
            <Route path="/etudiants" element={<EtudiantListPage />} />
            {/* Route paramétrée : détails d’un étudiant */}
            <Route path="/etudiants/:id" element={<EtudiantDetailsPage />} />
            {/* (Optionnel) 404 */}
            <Route path="*" element={<h2>Page introuvable</h2>} />
          </Route>
        </Routes>
      </EtudiantProvider>
    </>
  );
}

export default App;