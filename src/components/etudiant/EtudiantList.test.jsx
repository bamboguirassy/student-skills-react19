import { render, screen } from "@testing-library/react";
import EtudiantList from "./EtudiantList";
import { MemoryRouter } from "react-router-dom";

test("affiche un message quand la liste est vide", () => {
  render(
    <MemoryRouter>
      <EtudiantList etudiants={[]} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Aucun étudiant/)).toBeInTheDocument();
});

test("affiche le nom et l'email d’un étudiant", () => {
  const data = [{ id: 1, nom: "Amina", email: "amina@example.com" }];
  render(
    <MemoryRouter>
      <EtudiantList etudiants={data} />
    </MemoryRouter>
  );

  expect(screen.getByText("Amina")).toBeInTheDocument();
  expect(screen.getByText(/amina@example.com/)).toBeInTheDocument();
});