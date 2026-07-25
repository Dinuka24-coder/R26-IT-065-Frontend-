import { C } from "../../data/mockData";

export default function StatCard({ icon: Icon, label, value, sub, color = "#2563EB", iconBg }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <div
          className="stat-icon"
          style={{ background: iconBg || `${color}18` }}
        >
          <Icon size={20} color={color} />
        </div>
      </div>
      <div className="stat-value" style={{ color: C.text }}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
