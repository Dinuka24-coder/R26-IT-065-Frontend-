import { AlertCircle, Clock, FileImage, Plus, Upload, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import { C, DISEASE_PIE, PREDICTIONS, WEEKLY } from "../../data/mockData";
import { fmtConf, fmtDate } from "../../utils/helpers";

export default function DashboardPage({ navigate }) {
  const stats = [
    { icon: Users, label: "Total Patients", value: "1,284", sub: "↑ 12 this week", color: C.primary },
    { icon: FileImage, label: "Total Scans", value: "3,947", sub: "↑ 48 this week", color: C.purple },
    { icon: AlertCircle, label: "Positive Cases", value: "892", sub: "22.6% of scans", color: C.danger },
    { icon: Clock, label: "Today's Predictions", value: "23", sub: "Last: 10 min ago", color: C.warning },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-title">{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color }} className="chart-tooltip-row">
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-enter">
      <PageHeader
        title="Dashboard"
        subtitle={`Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, welcome back.`}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate("patient-register")}>
              <Plus size={14} /> Add Patient
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("xray-upload", "pneumonia")}>
              <Upload size={14} /> Upload Scan
            </Button>
          </>
        }
      />

      <div className="stats-grid">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <div className="card-heading-row">
            <div>
              <div className="card-title">Weekly Scan Volume</div>
              <div className="card-subtitle">X-ray vs CT scan breakdown</div>
            </div>
            <div className="soft-pill">This Week</div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={WEEKLY}>
              <defs>
                <linearGradient id="gX" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="xray" name="X-ray" stroke="#2563EB" strokeWidth={2.5} fill="url(#gX)" />
              <Area type="monotone" dataKey="ct" name="CT Scan" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#gC)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <div className="card-title">Disease Distribution</div>
          <div className="card-subtitle">All time prediction categories</div>

          <ResponsiveContainer width="100%" height={165}>
            <PieChart>
              <Pie data={DISEASE_PIE} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3}>
                {DISEASE_PIE.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="pie-legend">
            {DISEASE_PIE.map((d) => (
              <div key={d.name} className="pie-legend-row">
                <span>
                  <span className="legend-dot" style={{ background: d.color }} />
                  {d.name}
                </span>
                <strong>{d.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-card-header">
          <div className="card-title">Recent Activity</div>
          <Button variant="ghost" size="sm" onClick={() => navigate("history")}>
            View All →
          </Button>
        </div>

        <div className="table-wrap borderless">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Disease</th>
                <th>Scan Type</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {PREDICTIONS.slice(0, 6).map((p) => (
                <tr key={p.id}>
                  <td className="strong-cell">{p.patient}</td>
                  <td className="muted-cell">{p.disease}</td>
                  <td><Badge status={p.scanType} /></td>
                  <td>
                    <div className="mini-conf">
                      <div className="mini-track">
                        <div
                          className="mini-fill"
                          style={{
                            width: `${p.confidence * 100}%`,
                            background: p.status === "Positive" ? C.danger : C.success,
                          }}
                        />
                      </div>
                      <span>{fmtConf(p.confidence)}</span>
                    </div>
                  </td>
                  <td><Badge status={p.status} /></td>
                  <td className="date-cell">{fmtDate(p.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
