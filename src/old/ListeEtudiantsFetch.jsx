import { useEffect, useState } from "react";

function ListeEtudiantsFetch() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    fetch("https://68c4131281ff90c8e61b2241.mockapi.io/api/v1//etudiants") // Remplacez <base_url> par l'URL de votre projet MockAPI
      .then((res) => res.json()) // Transformer la réponse en JSON
      .then((data) => setEtudiants(data)) // Mettre à jour le state avec les données
      .catch((err) => console.error("Erreur:", err)); // Gérer les erreurs
  }, []);

  return (
    <div>
      <h2>Liste des étudiants (fetch)</h2>
      <ul>
        {etudiants.map((etudiant) => (
          <li key={etudiant.id}>{etudiant.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListeEtudiantsFetch;