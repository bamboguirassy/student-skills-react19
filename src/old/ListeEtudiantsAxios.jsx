import { useEffect, useState } from "react";
import axios from "axios";

function ListeEtudiantsAxios() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios
      .get("https://68c4131281ff90c8e61b2241.mockapi.io/api/v1//etudiants") // Requête GET envoyée à MockAPI
      .then((res) => setEtudiants(res.data)) // Accès direct aux données via res.data
      .catch((err) => console.error("Erreur:", err)); // Gestion des erreurs
  }, []);

  return (
    <div>
      <h2>Liste des étudiants (axios)</h2>
      <ul>
        {etudiants.map((etudiant) => (
          <li key={etudiant.id}>{etudiant.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListeEtudiantsAxios;