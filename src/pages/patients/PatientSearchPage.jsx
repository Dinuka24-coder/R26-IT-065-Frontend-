import { Eye, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import { C, PATIENTS } from "../../data/mockData";
import { fmtDate } from "../../utils/helpers";

export default function PatientSearchPage({ navigate }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    return PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.phone.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <div className="page-enter">
      <PageHeader
        title="Patient Search"
        subtitle="Find existing patients by name, ID, or phone number"
        actions={
          <Button variant="primary" size="sm" onClick={() => navigate("patient-register")}>
            <UserPlus size={14} /> Register Patient
          </Button>
        }
      />

      <div className="card search-card">
        <div className="input-icon-wrap">
          <Search size={17} color="#9CA3AF" className="input-icon" />
          <input
            className="form-input with-icon"
            placeholder="Search by name, patient ID, or phone number…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-card-header subtle">
          {filtered.length} patient{filtered.length !== 1 ? "s" : ""} found
        </div>

        <div className="table-wrap borderless">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Last Scan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="mono-cell">{p.id}</td>
                  <td className="strong-cell">{p.name}</td>
                  <td>{p.age}</td>
                  <td className="muted-cell">{p.gender}</td>
                  <td className="muted-cell">{p.phone}</td>
                  <td className="date-cell">{fmtDate(p.lastScan)}</td>
                  <td><Badge status={p.status} /></td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={() => navigate("history")}>
                      <Eye size={13} /> View
                    </Button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={8}>
                    <EmptyState icon={Search} title="No patients found" desc="Try a different name, ID, or phone number." />
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
