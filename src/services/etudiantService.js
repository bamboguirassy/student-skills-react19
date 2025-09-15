import api from "../services/axios";
import { etudiantStore } from "../stores/etudiantStore";

export async function loadEtudiants() {
  etudiantStore.loading.set(true);
  try {
    const res = await api.get("/etudiants");
    etudiantStore.etudiants.set(res.data || []);
    etudiantStore.error.set("");
  } catch (err) {
    console.error(err);
    etudiantStore.error.set("Impossible de charger les étudiants.");
  } finally {
    etudiantStore.loading.set(false);
  }
}

export function addEtudiant(created) {
  etudiantStore.etudiants.set((prev) => [created, ...prev]);
}

export function updateEtudiant(updated) {
  etudiantStore.etudiants.set((prev) =>
    prev.map((e) => (e.id === updated.id ? updated : e))
  );
}

export function deleteEtudiant(id) {
  etudiantStore.etudiants.set((prev) => prev.filter((e) => e.id !== id));
}