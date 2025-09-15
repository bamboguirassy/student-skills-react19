import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/axios";
import EtudiantList from "../components/etudiant/EtudiantList";
import EtudiantForm from "../components/etudiant/EtudiantForm";
import EtudiantEditForm from "../components/etudiant/EtudiantEditForm";
import Breadcrumb from "../components/ui/Breadcrumb";
import EtudiantFilters from "../components/etudiant/EtudiantFilters";
import dayjs from "dayjs";
import { useSelector } from "@legendapp/state/react";
import { etudiantStore } from "../stores/etudiantStore";
import { loadEtudiants, addEtudiant, updateEtudiant, deleteEtudiant } from "../services/etudiantService";
import { message } from "antd";


function EtudiantListPage() {

    const etudiants = useSelector(() => etudiantStore.etudiants.get());
    const loading = useSelector(() => etudiantStore.loading.get());
    const error = useSelector(() => etudiantStore.error.get());
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // check if already loaded?
        if (etudiants.length === 0) {
            loadEtudiants();
        }
    }, [etudiants.length]);
    // ne pas oublier d'importer useEffect

    const [selected, setSelected] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Création
    const handleCreate = useCallback((created) => {
        addEtudiant(created);
    }, []);

    // Édition
    const handleStartEdit = useCallback((student) => {
        setSelected(student);
    }, []);

    const handleUpdated = useCallback((updated) => {
        updateEtudiant(updated);
        setSelected(null);
    }, []);

    // Suppression
    const handleDelete = useCallback(async (student) => {
        setDeletingId(student.id);
        try {
            await api.delete(`/etudiants/${student.id}`);
            deleteEtudiant(student.id); // retire du store (contexte)
            messageApi.success(`"${student.nom}" a été supprimé.`);
        } catch (err) {
            console.error(err);
            messageApi.error("Échec de la suppression. Réessayez.");
        } finally {
            setDeletingId(null);
        }
    }, [messageApi]);

    // État des filtres
    const [filters, setFilters] = useState({ search: "", minAge: null });

    // Mises à jour des filtres (patch)
    const handleFilters = useCallback((patch) => {
        setFilters((prev) => ({ ...prev, ...patch }));
    }, []);

    // Liste filtrée (simple, sans optimisation pour l'instant)
    const filtered = useMemo(() => {
        return etudiants.filter((e) => {
            const okName = filters.search
                ? (e.nom ?? "").toLowerCase().includes(filters.search.toLowerCase())
                : true;

            // Reprenez le calcul d’âge introduit au chapitre 1
            let age = null;
            if (e.date_naissance) {
                const birth = dayjs(e.date_naissance);
                if (birth.isValid()) {
                    age = dayjs().diff(birth, "year");
                }
            }

            const okAge =
                filters.minAge != null ? age != null && age >= Number(filters.minAge) : true;

            return okName && okAge;
        });
    }, [etudiants, filters]);

    if (loading) return <p>Chargement des étudiants…</p>;
    if (error) return <p style={{ color: "crimson" }}>{error}</p>;

    return (
        <div>
            {contextHolder}
            <Breadcrumb items={[{ label: "Accueil", to: "/" }, { label: "Étudiants" }]} />
            <h1>Étudiants</h1>

            <EtudiantForm onCreate={handleCreate} />

            <EtudiantFilters
                search={filters.search}
                minAge={filters.minAge}
                onChange={handleFilters}
            />

            {selected && (
                <EtudiantEditForm
                    student={selected}
                    onUpdate={handleUpdated}
                    onCancel={() => setSelected(null)}
                />
            )}

            <EtudiantList
                etudiants={filtered} // ← sera remplacé par la liste filtrée (modif d’attribut simple)
                onEdit={handleStartEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
            />

            {/* [RESERVE] PAGINATION : contrôles de pagination (chapitre ultérieur) */}
        </div>
    );
}

export default EtudiantListPage;