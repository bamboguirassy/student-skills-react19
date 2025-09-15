import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    padding: "6px 10px",
  });

  return (
    <div>
      <nav style={{ display: "flex", gap: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
        <NavLink to="/" style={linkStyle}>Accueil</NavLink>
        <NavLink to="/etudiants" style={linkStyle}>Étudiants</NavLink>

        {/* // Placeholder pour la route de EtudiantDetailsPage (ex: /etudiants/:id) */}
        {/* <NavLink to="/etudiants/1" style={linkStyle}>Étudiant #1</NavLink> */}
      </nav>

      <main style={{ padding: 12 }}>
        <Outlet /> {/* ici s'affichent les pages */}
      </main>
    </div>
  );
}

export default AppLayout;