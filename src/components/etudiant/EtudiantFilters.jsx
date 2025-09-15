function EtudiantFilters({ search, minAge, onChange }) {
    return (
        <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
            <input
                type="text"
                placeholder="Rechercher par nom…"
                value={search}
                onChange={(e) => onChange({ search: e.target.value })}
            />
            <input
                type="number"
                min={0}
                placeholder="Âge minimum"
                value={minAge ?? ""}
                onChange={(e) =>
                    onChange({ minAge: e.target.value ? Number(e.target.value) : null })
                }
            />
        </div>
    );
}
export default EtudiantFilters;