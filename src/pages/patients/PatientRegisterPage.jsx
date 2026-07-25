import { CheckCircle, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { C } from "../../data/mockData";
import { sleep } from "../../utils/helpers";

export default function PatientRegisterPage({ navigate }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [saved, setSaved] = useState(false);

  const F = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave(e) {
    e.preventDefault();
    await sleep(700);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("patient-search");
    }, 1200);
  }

  return (
    <div className="page-enter">
      <PageHeader
        title="Register New Patient"
        subtitle="Fill in patient details to create a new record"
        onBack={() => navigate("patient-search")}
      />

      <div className="card form-card">
        {saved && (
          <div className="success-box">
            <CheckCircle size={17} /> Patient registered successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="stack-form">
          <div className="two-col">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => F("name", e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Age *</label>
              <input className="form-input" type="number" placeholder="45" min="1" max="120" value={form.age} onChange={(e) => F("age", e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select className="form-select" value={form.gender} onChange={(e) => F("gender", e.target.value)} required>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-icon-wrap">
                <Phone size={15} color="#9CA3AF" className="input-icon" />
                <input className="form-input with-icon" placeholder="07X-XXX-XXXX" value={form.phone} onChange={(e) => F("phone", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <div className="input-icon-wrap">
              <MapPin size={15} color="#9CA3AF" className="input-icon" />
              <input className="form-input with-icon" placeholder="Street, City" value={form.address} onChange={(e) => F("address", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Clinical Notes</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Symptoms, history, medications…"
              value={form.notes}
              onChange={(e) => F("notes", e.target.value)}
            />
          </div>

          <div className="form-actions">
            <Button variant="secondary" onClick={() => navigate("patient-search")}>Cancel</Button>
            <Button variant="primary" type="submit">
              <CheckCircle size={15} /> Register Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
