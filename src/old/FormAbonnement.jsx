import { useActionState } from "react";

async function subscribeAction(prevState, formData) {
  const email = formData.get("email")?.toString() || "";
  await new Promise((r) => setTimeout(r, 800)); // simulation réseau

  if (!email.includes("@")) {
    return { ok: false, message: "Adresse email invalide." };
  }
  // ici on "réussit" l'abonnement
  return { ok: true, message: `Abonné avec succès : ${email}` };
}

export default function FormAbonnement() {
  const initialState = { ok: null, message: "" };
  const [state, subscribe, isPending] = useActionState(
    subscribeAction,
    initialState
  );

  return (
    <form action={subscribe}>
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        aria-label="Email"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Envoi..." : "S'abonner"}
      </button>

      {state.message && (
        <p style={{ color: state.ok ? "green" : "crimson" }}>{state.message}</p>
      )}
    </form>
  );
}