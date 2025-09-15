import { useEffect, useState, useCallback } from "react";
import { EtudiantContext } from "../contexts/EtudiantContext";
import api from "../services/axios";

export function EtudiantProvider({ children }) {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState("");

  // Chargement unique au montage du Provider (cache en mémoire)
  useEffect(() => {
    let mounted = true;
    api.get("/etudiants")
      .then((res) => {
        if (!mounted) return;
        setEtudiants(res.data || []);
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Impossible de charger les étudiants.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  // Actions : mutent le "store" local → re-rendu auto des consommateurs
  const addEtudiant = useCallback((created) => {
    setEtudiants((prev) => [created, ...prev]);
  }, []);

  const updateEtudiant = useCallback((updated) => {
    setEtudiants((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }, []);

  const deleteEtudiant = useCallback((id) => {
    setEtudiants((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const value = { etudiants, loading, error, addEtudiant, updateEtudiant, deleteEtudiant };

  return (
    <EtudiantContext.Provider value={value}>
      {children}
    </EtudiantContext.Provider>
  );
}