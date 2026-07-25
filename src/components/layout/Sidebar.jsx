import { useState } from "react";
import {
  Activity,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  FileImage,
  FileText,
  LayoutDashboard,
  LogOut,
  Scan,
  Settings,
  Users,
} from "lucide-react";
import { initials } from "../../utils/helpers";

const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  {
    id: "patients",
    label: "Patients",
    Icon: Users,
    children: [
      { id: "patient-search", label: "Search Patient" },
      { id: "patient-register", label: "Register Patient" },
    ],
  },
  {
    id: "xray",
    label: "X-ray Analysis",
    Icon: FileImage,
    children: [
      { id: "xray-pneumothorax", label: "Pneumothorax" },
      { id: "xray-pneumonia", label: "Pneumonia" },
      { id: "xray-tuberculosis", label: "Tuberculosis" },
      { id: "xray-full", label: "Full Screening" },
    ],
  },
  {
    id: "ct",
    label: "CT Scan Analysis",
    Icon: Scan,
    children: [{ id: "ct-upload", label: "Lung Cancer" }],
  },
  { id: "history", label: "Prediction History", Icon: Clock },
  { id: "reports", label: "Reports", Icon: FileText },
];

export default function Sidebar({ page, navigate, user, onLogout }) {
  const [open, setOpen] = useState({ patients: true, xray: true, ct: true });

  const isActive = (id) => page === id || page.startsWith(id + "-");

  function navTo(id) {
    const xrayMap = {
      "xray-pneumothorax": "pneumothorax",
      "xray-pneumonia": "pneumonia",
      "xray-tuberculosis": "tuberculosis",
      "xray-full": "full",
    };

    if (xrayMap[id]) {
      navigate("xray-upload", xrayMap[id]);
      return;
    }

    if (id === "ct-upload") {
      navigate("ct-upload");
      return;
    }

    navigate(id);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Activity size={18} color="#60A5FA" />
        </div>
        <div>
          <div className="brand-title">PulmoAI</div>
          <div className="brand-subtitle">Diagnostic System</div>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section">Navigation</div>

        {NAV.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <>
                <button
                  className={`sidebar-nav-item${isActive(item.id) ? " active" : ""}`}
                  onClick={() => setOpen((p) => ({ ...p, [item.id]: !p[item.id] }))}
                >
                  <item.Icon size={18} />
                  <span className="nav-label">{item.label}</span>
                  {open[item.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {open[item.id] &&
                  item.children.map((ch) => (
                    <button
                      key={ch.id}
                      className={`sidebar-nav-item sub${
                        (ch.id.startsWith("xray-") && page === "xray-upload") ||
                        (ch.id === "ct-upload" && page === "ct-upload")
                          ? " active"
                          : ""
                      }`}
                      onClick={() => navTo(ch.id)}
                    >
                      <ChevronRight size={13} />
                      {ch.label}
                    </button>
                  ))}
              </>
            ) : (
              <button
                className={`sidebar-nav-item${page === item.id ? " active" : ""}`}
                onClick={() => navigate(item.id)}
              >
                <item.Icon size={18} />
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}

        {user.role === "Admin" && (
          <>
            <div className="nav-section admin-section">Administration</div>
            <button
              className={`sidebar-nav-item${page === "admin" ? " active" : ""}`}
              onClick={() => navigate("admin")}
            >
              <Settings size={18} />
              <span>Admin Panel</span>
            </button>
          </>
        )}
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-card">
          <div className="avatar small">{initials(user.name)}</div>
          <div className="user-meta">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>

        <button className="sidebar-nav-item logout-btn" onClick={onLogout}>
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
