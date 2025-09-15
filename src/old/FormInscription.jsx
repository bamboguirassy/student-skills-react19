import { useActionState } from "react";

async function signUpAction(prevState, formData) {
  const nom = formData.get("nom")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  await new Promise((r) => setTimeout(r, 700));

  const errors = {};
  if (nom.length < 2) errors.nom = "Le nom doit faire au moins 2 caractères.";
  if (password.length < 6)
    errors.password = "Le mot de passe doit faire au moins 6 caractères.";

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }
  return { ok: true, message: `Bienvenue ${nom} !` };
}

export default function FormInscription() {
  const [state, signUp, isPending] = useActionState(signUpAction, {
    ok: null,
    message: "",
    errors: {},
  });

  return (
    <form action={signUp} noValidate>
      <div>
        <label>
          Nom
          <input name="nom" type="text" aria-invalid={!!state.errors?.nom} />
        </label>
        {state.errors?.nom && (
          <p role="alert" style={{ color: "crimson" }}>{state.errors.nom}</p>
        )}
      </div>

      <div>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            aria-invalid={!!state.errors?.password}
          />
        </label>
        {state.errors?.password && (
          <p role="alert" style={{ color: "crimson" }}>
            {state.errors.password}
          </p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Création..." : "Créer mon compte"}
      </button>

      {state.ok && <p style={{ color: "green" }}>{state.message}</p>}
    </form>
  );
}