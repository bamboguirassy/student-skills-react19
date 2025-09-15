import { useState } from "react";

function Compteur() {
  // Déclare une variable d'état "count" avec valeur initiale 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez-moi</button>
    </div>
  );
}

export default Compteur;