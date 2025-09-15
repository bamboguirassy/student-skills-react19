import { observable } from "@legendapp/state";

// Store global des étudiants
export const etudiantStore = observable({
  etudiants: [],
  loading: true,
  error: "",
});