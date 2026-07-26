import { Activity, Cpu, Database, Plus, RefreshCw, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { C, DOCTORS, LOG_ENTRIES } from "../../data/mockData";
import { fmtDate } from "../../utils/helpers";

export default function AdminPage() {
  const [tab, setTab] = useState("users");

  const sysStatus = [
    { label: "X-ray Model (Pneumonia)", status: "Online", acc: "89.2%", latency: "142ms" },
    { label: "X-ray Model (Pneumothorax)", status: "Online", acc: "91.4%", latency: "138ms" },
    { label: "X-ray Model (Tuberculosis)", status: "Online", acc: "87.8%", latency: "155ms" },
    { label: "CT Lung Cancer Model", status: "Online", acc: "88.6%", latency: "218ms" },
  ];

  return (
    <div className="page-enter">
      <PageHeader title="Admin Panel" subtitle="Manage doctors, AI model status, and system logs" />

      <div className="tab-strip">
        {[
          { k: "users", label: "Manage Users" },
          { k: "system", label: "AI Model Status" },
          { k: "logs", label: "System Logs" },
        ].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`tab-btn${tab === t.k ? " active" : ""}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <div className="card">
          <div className="table-card-header">
            <div className="card-title">User Accounts ({DOCTORS.length})</div>
            <Button variant="primary" size="sm"><Plus size={14} /> Add Doctor</Button>
          </div>

          <div className="table-wrap borderless">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {DOCTORS.map((d) => (
                  <tr key={d.id}>
                    <td className="strong-cell">{d.name}</td>
                    <td className="muted-cell">{d.specialty}</td>
                    <td className="muted-cell">{d.email}</td>
                    <td><Badge status={d.role} /></td>
                    <td><Badge status={d.status} /></td>
                    <td className="date-cell">{fmtDate(d.lastLogin)}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-ghost btn-sm action-icon"><Settings size={13} /></button>
                        <button className="btn btn-ghost btn-sm action-icon danger-text"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "system" && (
        <div className="system-stack">
          <div className="admin-stats-grid">
            {[
              { icon: Cpu, label: "CPU Usage", value: "34%", color: C.success },
              { icon: Database, label: "Memory", value: "67%", color: C.warning },
              { icon: Activity, label: "Uptime", value: "99.8%", color: C.primary },
            ].map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {sysStatus.map((s) => (
            <div key={s.label} className="card model-status-card">
              <div className="status-dot" />
              <div className="model-name">{s.label}</div>
              <div className="model-metric">Accuracy: <strong>{s.acc}</strong></div>
              <div className="model-metric">Latency: <strong>{s.latency}</strong></div>
              <Badge status="Active" />
              <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> Reload</button>
            </div>
          ))}
        </div>
      )}

      {tab === "logs" && (
        <div className="card logs-card">
          <div className="logs-head">
            <div className="live-dot" />
            <span>System Log — Live</span>
            <span className="logs-time">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="logs-body">
            {LOG_ENTRIES.map((e, i) => (
              <div key={i} className="log-row">
                <span className="log-time">{e.time}</span>
                <span className={`log-level ${e.level.toLowerCase()}`}>{e.level}</span>
                <span className="log-msg">{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
