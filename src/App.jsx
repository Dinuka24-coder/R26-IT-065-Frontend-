import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  function navigate(p) {
    if (p === "login") {
      setUser(null);
      setPage("dashboard");
      return;
    }
    setPage(p);
  }

  if (!user) {
    return <LoginPage onLogin={(u) => { setUser(u); setPage("dashboard"); }} />;
  }

  return (
    <div className="pulmo-app">
      <Sidebar page={page} navigate={navigate} user={user} onLogout={() => { setUser(null); setPage("dashboard"); }} />
      <div className="content-area">
        <TopBar user={user} onLogout={() => { setUser(null); setPage("dashboard"); }} />
        <main className="main-scroll">
          <p>Logged in as {user.name}. More pages coming soon.</p>
        </main>
      </div>
    </div>
  );
}
