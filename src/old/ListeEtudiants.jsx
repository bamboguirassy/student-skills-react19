function ListeEtudiants() {
  const etudiants = [
    { id: 1, nom: "Amina" },
    { id: 2, nom: "Karim" },
    { id: 3, nom: "Fatou" }
  ];

  return (
    <ul>
      {etudiants.map((etudiant) => (
        <li key={etudiant.id}>{etudiant.nom}</li>
      ))}
    </ul>
  );
}

export default ListeEtudiants;