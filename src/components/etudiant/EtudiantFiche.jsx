function EtudiantFiche({ student }) {
  if (!student) {
    // La page gère déjà loading/error ; ceci sécurise si student est null
    return <p>Données étudiant indisponibles.</p>;
  }

  const { nom, email, avatar, date_naissance, createdAt } = student;

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {avatar ? (
        <img
          src={avatar}
          alt={nom || "Avatar étudiant"}
          width="72"
          height="72"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <div
          aria-label="avatar placeholder"
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#eee", display: "grid", placeItems: "center"
          }}
        >
          👤
        </div>
      )}

      <div>
        <h2 style={{ margin: 0 }}>{nom || "Nom inconnu"}</h2>
        {email && <p style={{ margin: "4px 0", opacity: 0.8 }}>{email}</p>}
        <div style={{ fontSize: 14, opacity: 0.75 }}>
          {date_naissance && <>Né(e) le : <strong>{date_naissance}</strong></>}
          {createdAt && (
            <>
              {" · "}Créé le : <strong>{new Date(createdAt).toLocaleDateString()}</strong>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EtudiantFiche;