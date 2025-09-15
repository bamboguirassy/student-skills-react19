import { useState } from "react";
import api from "../../services/axios";

function EtudiantEditForm({ student, onUpdate, onCancel }) {
  const [nom, setNom] = useState(student?.nom || "");
  const [email, setEmail] = useState(student?.email || "");
  const [dateNaissance, setDateNaissance] = useState(student?.date_naissance || "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const payload = {
        ...student,
        nom,
        email,
        date_naissance: dateNaissance,
      };

      const res = await api.put(`/etudiants/${student.id}`, payload);
      const updated = res.data;

      if (typeof onUpdate === "function") onUpdate(updated);
    } catch (err) {
      console.error(err);
      setError("Impossible de mettre à jour l’étudiant. Réessayez.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 12 }}>
      <h3>Modifier l’étudiant</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 8 }}>
          <label>
            Nom<br />
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Email<br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Date de naissance<br />
            <input
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={pending}>
          {pending ? "Mise à jour…" : "Enregistrer"}
        </button>
        {" "}
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </form>

      {error && <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>}
    </div>
  );
}

export default EtudiantEditForm;