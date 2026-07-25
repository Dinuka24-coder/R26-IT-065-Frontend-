import { ChevronRight } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { C, XRAY_DISEASES } from "../../data/mockData";

export default function XrayOptionsPage({ navigate }) {
  return (
    <div className="page-enter">
      <PageHeader title="X-ray Analysis" subtitle="Choose a detection model or run full X-ray screening" />

      <div className="model-grid">
        {XRAY_DISEASES.map((d) => (
          <button key={d.id} onClick={() => navigate("xray-upload", d.id)} className="model-card">
            <div className="model-icon" style={{ background: d.bg }}>
              <d.Icon size={22} color={d.color} />
            </div>

            <div className="model-title">{d.label}</div>
            <div className="model-desc">{d.desc}</div>

            <div className="model-action" style={{ color: d.color }}>
              Start Analysis <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
