import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axios"; // ← instance axios centralisée
import EtudiantFiche from "../components/etudiant/EtudiantFiche";
import CompetenceListByEtudiant from "../components/competence/CompetenceListByEtudiant";
import Breadcrumb from "../components/ui/Breadcrumb";

function EtudiantDetailsPage() {
    const { id } = useParams(); // id de l’étudiant depuis l’URL

    // État local pour la fiche étudiant
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Chargement des détails de l’étudiant
    useEffect(() => {
        if (!id) return;
        let mounted = true;

        setLoading(true);
        setError("");

        api
            .get(`/etudiants/${id}`) // GET /etudiants/:id
            .then((res) => {
                if (!mounted) return;
                setStudent(res.data || null);
            })
            .catch((err) => {
                if (!mounted) return;
                console.error(err);
                setError("Impossible de récupérer les détails de l’étudiant.");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false; // évite setState après démontage
        };
    }, [id]);

    return (
        <div>
            <Breadcrumb items={[
                { label: "Accueil", to: "/" },
                { label: "Étudiants", to: "/etudiants" },
                { label: `Étudiant #${id}` } // courant
            ]} />
            <h1>
                Détails de l’étudiant #{id}
                {student?.nom ? ` — ${student.nom}` : ""}
            </h1>

            {/* États réseau globaux (on garde les placeholders en dessous) */}
            {loading && <p>Chargement des détails…</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <section style={{ padding: 12, border: "1px solid #eee", borderRadius: 8, marginBottom: 16 }}>
                <EtudiantFiche student={student} />
            </section>

            <section style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
                <CompetenceListByEtudiant etudiantId={id} />
            </section>
        </div>
    );
}

export default EtudiantDetailsPage;
