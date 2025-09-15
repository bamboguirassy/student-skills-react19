function CompetenceList({ competences = [] }) {
  if (!competences || competences.length === 0) {
    return <p>Aucune compétence pour cet étudiant.</p>;
  }

  return (
    <div>
      <h3>Compétences</h3>
      <ul>
        {competences.map((c) => (
          <li key={c.id}>
            <strong>{c.libelle}</strong>
            {typeof c.niveau !== "undefined" && <> — niveau {c.niveau}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompetenceList;