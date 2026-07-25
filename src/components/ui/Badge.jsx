export default function Badge({ status }) {
  const map = {
    Positive: "badge-positive",
    Normal: "badge-normal",
    Warning: "badge-warn",
    Info: "badge-info",
    Active: "badge-normal",
    Inactive: "badge-positive",
    "X-ray": "badge-info",
    "CT Scan": "badge-purple",
    Doctor: "badge-info",
    Admin: "badge-warn",
    High: "badge-positive",
    Moderate: "badge-warn",
    Low: "badge-normal",
  };

  return <span className={`badge ${map[status] || "badge-info"}`}>{status}</span>;
}
