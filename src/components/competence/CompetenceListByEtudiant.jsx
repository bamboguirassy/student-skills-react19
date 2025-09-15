import { useEffect, useState } from "react";
import api from "../../services/axios"; // instance axios centralisée
import CompetenceList from "./CompetenceList";
import CompetenceCreateForm from "./CompetenceCreateForm";

/**
 * Orchestrateur des compétences pour un étudiant.
 * - Reçoit etudiantId
 * - Charge les compétences
 * - Prépare les placeholders pour:
 *    - <CompetenceCreateForm etudiantId={...} onCreate={handleCreate} />
 *    - <CompetenceList competences={competences} />
 */
function CompetenceListByEtudiant({ etudiantId }) {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger les compétences de l'étudiant
  useEffect(() => {
    if (!etudiantId) return;
    let mounted = true;

    setLoading(true);
    setError("");

    api
      .get(`/etudiants/${etudiantId}/competences`)
      .then((res) => {
        if (!mounted) return;
        setCompetences(res.data || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError("Impossible de charger les compétences de cet étudiant.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [etudiantId]);

  // Callback futur pour ajouter localement la compétence créée depuis le formulaire enfant
  const handleCreate = (created) => {
    // Sera appelé par <CompetenceCreateForm onCreate={handleCreate} />
    setCompetences((prev) => [created, ...prev]);
  };

  if (!etudiantId) {
    return <p style={{ color: "crimson" }}>Aucun étudiant sélectionné (etudiantId manquant).</p>;
  }
  if (loading) return <p>Chargement des compétences…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <section>
      <h2>Compétences de l’étudiant #{etudiantId}</h2>

      <CompetenceCreateForm etudiantId={etudiantId} onCreate={handleCreate} />

      <CompetenceList competences={competences} />
    </section>
  );
}

export default CompetenceListByEtudiant;