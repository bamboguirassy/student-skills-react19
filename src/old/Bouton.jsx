function Bouton() {
  const handleClick = () => {
    alert("Bouton cliqué !");
  };

  return <button onClick={handleClick}>Cliquez-moi</button>;
}

export default Bouton;