import { useState } from "react";
import { Activity, AlertCircle, Cpu, Loader, Lock, Shield, TrendingUp, User } from "lucide-react";
import { C, USERS } from "../../data/mockData";
import { sleep } from "../../utils/helpers";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("doctor@pulmoai.lk");
  const [pwd, setPwd] = useState("doctor123");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    await sleep(800);

    const u = USERS.find((c) => c.email === email && c.password === pwd);

    if (u) {
      onLogin({ name: u.name, role: u.role, email: u.email });
    } else {
      setErr("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="login-brand-main">
          <div className="login-logo-row">
            <div className="login-logo">
              <Activity size={24} color="#60A5FA" />
            </div>
            <span className="login-logo-text">PulmoAI</span>
          </div>

          <h1 className="login-heading">Multi-Model Pulmonary Disease Detection</h1>

          <p className="login-copy">
            A clinical decision support dashboard for doctors and administrators to analyze chest X-rays and CT scans from one workspace.
          </p>
        </div>

        <div className="login-features">
          {[
            { Icon: Shield, label: "Doctor/Admin controlled access" },
            { Icon: Cpu, label: "4 AI components — X-ray & CT" },
            { Icon: TrendingUp, label: "Hospital-grade dashboard workflow" },
          ].map(({ Icon, label }) => (
            <div key={label} className="login-feature">
              <div className="login-feature-icon">
                <Icon size={16} color="#60A5FA" />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="demo-creds">
          <p>Demo credentials:</p>
          <p>
            Doctor: doctor@pulmoai.lk / doctor123<br />
            Admin: admin@pulmoai.lk / admin123
          </p>
        </div>
      </div>

      <div className="login-form-wrap">
        <div className="login-card">
          <h2>Welcome back</h2>
          <p>Sign in to your PulmoAI account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-icon-wrap">
                <User size={16} color="#9CA3AF" className="input-icon" />
                <input
                  className="form-input with-icon"
                  type="email"
                  placeholder="doctor@pulmoai.lk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-icon-wrap">
                <Lock size={16} color="#9CA3AF" className="input-icon" />
                <input
                  className="form-input with-icon"
                  type="password"
                  placeholder="••••••••"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </div>
            </div>

            {err && (
              <div className="error-box">
                <AlertCircle size={15} />
                {err}
              </div>
            )}

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader size={15} className="spin" /> Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
