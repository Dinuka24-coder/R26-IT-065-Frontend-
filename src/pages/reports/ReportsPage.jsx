import { Download, Eye, FileText, Plus, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import { C, REPORTS } from "../../data/mockData";
import { fmtDate } from "../../utils/helpers";

export default function ReportsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    return REPORTS.filter((r) => r.patient.toLowerCase().includes(query) || r.type.toLowerCase().includes(query));
  }, [q]);

  return (
    <div className="page-enter">
      <PageHeader
        title="Reports"
        subtitle="Generated diagnostic reports — preview, download, or print"
        actions={
          <Button variant="primary" size="sm">
            <Plus size={14} /> Generate Report
          </Button>
        }
      />

      <div className="card search-card">
        <div className="input-icon-wrap">
          <Search size={16} color="#9CA3AF" className="input-icon" />
          <input
            className="form-input with-icon"
            placeholder="Search by patient or report type…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="reports-list">
        {filtered.map((r) => (
          <div key={r.id} className="card report-card">
            <div className="report-icon">
              <FileText size={20} color={C.primary} />
            </div>

            <div className="report-main">
              <div className="report-title">{r.type}</div>
              <div className="report-meta">
                {r.patient} · {r.doctor} · {fmtDate(r.date)} · {r.pages} pages
              </div>
            </div>

            <div className="report-actions">
              <Button variant="ghost" size="sm"><Eye size={13} /> Preview</Button>
              <Button variant="secondary" size="sm"><Printer size={13} /> Print</Button>
              <Button variant="secondary" size="sm"><Download size={13} /> Download</Button>
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="card padded">
            <EmptyState icon={FileText} title="No reports found" desc="Try a different search term." />
          </div>
        )}
      </div>
    </div>
  );
}
