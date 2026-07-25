import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Moon, Settings, Sun } from "lucide-react";
import { C } from "../../data/mockData";
import { initials } from "../../utils/helpers";

export default function TopBar({ user, onLogout }) {
  const [showUser, setShowUser] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUser(false);
      }
    }

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-title">PulmoAI Diagnostic System</div>

      <div className="topbar-actions">
        <button className="icon-btn" onClick={() => setDark((p) => !p)} title="Theme toggle">
          {dark ? <Sun size={18} color={C.textSub} /> : <Moon size={18} color={C.textSub} />}
        </button>

        <button className="icon-btn notif-btn" title="Notifications">
          <Bell size={18} color={C.textSub} />
          <span className="notif-dot" />
        </button>

        <div className="user-menu" ref={menuRef}>
          <div className="avatar" onClick={() => setShowUser((p) => !p)}>
            {initials(user.name)}
          </div>

          {showUser && (
            <div className="dropdown">
              <div className="dropdown-user">
                <div className="dropdown-name">{user.name}</div>
                <div className="dropdown-role">{user.role}</div>
              </div>
              <div className="dropdown-item">
                <Settings size={15} color={C.textMuted} />
                Settings
              </div>
              <div
                className="dropdown-item danger"
                onClick={() => {
                  setShowUser(false);
                  onLogout();
                }}
              >
                <LogOut size={15} color={C.danger} />
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
