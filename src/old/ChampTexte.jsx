import { useState } from "react";

function ChampTexte() {
  const [valeur, setValeur] = useState("");

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  return (
    <div>
      <input type="text" value={valeur} onChange={handleChange} />
      <p>Vous avez tapé : {valeur}</p>
    </div>
  );
}

export default ChampTexte;