import { useState } from "react";
import api from "../../services/axios"; // instance axios centralisée

/**
 * Formulaire de création d'une compétence pour un étudiant.
 * Props :
 *  - etudiantId : string | number (obligatoire)
 *  - onCreate(created) : callback appelé après succès (retour serveur)
 */
function CompetenceCreateForm({ etudiantId, onCreate }) {
  const [libelle, setLibelle] = useState("");
  const [niveau, setNiveau] = useState(1); // ex. 1..5
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!etudiantId) {
      setError("Aucun étudiant sélectionné.");
      return;
    }

    setPending(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        libelle,
        niveau: Number(niveau),
        createdAt: new Date().toISOString(),
      };

      const res = await api.post(`/etudiants/${etudiantId}/competences`, payload);
      const created = res.data;

      setSuccess("Compétence ajoutée ✅");
      setLibelle("");
      setNiveau(1);

      // Notifier l’orchestrateur pour mise à jour locale de la liste
      if (typeof onCreate === "function") onCreate(created);
    } catch (err) {
      console.error(err);
      setError("Échec de la création. Vérifiez les champs et réessayez.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 12 }}>
      <h3>Ajouter une compétence</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 8 }}>
          <label>
            Libellé<br />
            <input
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              required
              placeholder="Ex. JavaScript"
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Niveau (1 à 5)<br />
            <input
              type="number"
              min="1"
              max="5"
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={pending}>
          {pending ? "Ajout en cours…" : "Ajouter"}
        </button>
      </form>

      {success && <p style={{ color: "green", marginTop: 8 }}>{success}</p>}
      {error && <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>}
    </div>
  );
}

export default CompetenceCreateForm;