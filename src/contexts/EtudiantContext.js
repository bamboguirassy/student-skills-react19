import { createContext, useContext } from "react";

export const EtudiantContext = createContext(null);

/** Hook de confort pour consommer le contexte partout dans l’app */
export function useEtudiants() {
  const ctx = useContext(EtudiantContext);
  if (!ctx) {
    throw new Error("useEtudiants doit être utilisé sous <EtudiantProvider>.");
  }
  return ctx;
}