// src/components/ui/PageFallback.jsx
import { Spin } from "antd";

export default function PageFallback({ label = "Chargement…" }) {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: 180 }}>
      <Spin tip={label} />
    </div>
  );
}