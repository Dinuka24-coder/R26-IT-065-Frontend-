import { Download, Eye, Filter, Trash2, X, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import { C, PREDICTIONS } from "../../data/mockData";
import { fmtConf, fmtDate } from "../../utils/helpers";

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const types = ["all", "Pneumonia", "Pneumothorax", "Tuberculosis", "Adenocarcinoma", "Squamous Cell Carcinoma", "Normal"];

  const filtered = useMemo(
    () =>
      PREDICTIONS.filter(
        (p) => (filter === "all" || p.disease === filter) && (!dateFilter || p.date === dateFilter)
      ),
    [filter, dateFilter]
  );

  return (
    <div className="page-enter">
      <PageHeader title="Prediction History" subtitle="All AI-generated diagnostic predictions" />

      <div className="card filter-card">
        <Filter size={16} color={C.textMuted} />
        <span className="filter-label">Filter by:</span>

        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>{t === "all" ? "All Diseases" : t}</option>
          ))}
        </select>

        <input type="date" className="form-input" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />

        {(filter !== "all" || dateFilter) && (
          <Button variant="ghost" size="sm" onClick={() => { setFilter("all"); setDateFilter(""); }}>
            <X size={13} /> Clear
          </Button>
        )}

        <span className="record-count">{filtered.length} records</span>
      </div>

      <div className="card">
        <div className="table-wrap borderless">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Scan Type</th>
                <th>Disease</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="strong-cell">{p.patient}</td>
                  <td><Badge status={p.scanType} /></td>
                  <td className="muted-cell">{p.disease}</td>
                  <td>
                    <div className="mini-conf">
                      <div className="mini-track">
                        <div
                          className="mini-fill"
                          style={{ width: `${p.confidence * 100}%`, background: p.status === "Positive" ? C.danger : C.success }}
                        />
                      </div>
                      <span>{fmtConf(p.confidence)}</span>
                    </div>
                  </td>
                  <td><Badge status={p.status} /></td>
                  <td className="date-cell">{fmtDate(p.date)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-sm action-icon"><Eye size={13} /></button>
                      <button className="btn btn-ghost btn-sm action-icon"><Download size={13} /></button>
                      <button className="btn btn-ghost btn-sm action-icon danger-text"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={7}>
                    <EmptyState icon={Clock} title="No predictions found" desc="Try adjusting the filters." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
