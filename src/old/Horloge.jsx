import { useState, useEffect } from "react";

function Horloge() {
  const [heure, setHeure] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setHeure(new Date().toLocaleTimeString());
    }, 1000);

    // Nettoyage (évite les fuites mémoire)
    return () => clearInterval(timer);
  }, []); // [] → exécuter seulement au montage

  return <h2>Il est {heure}</h2>;
}

export default Horloge;