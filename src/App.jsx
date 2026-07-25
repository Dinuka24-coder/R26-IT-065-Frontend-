import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PatientRegisterPage from "./pages/patients/PatientRegisterPage";
import PatientSearchPage from "./pages/patients/PatientSearchPage";

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

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage navigate={navigate} />;
      case "patient-search":
        return <PatientSearchPage navigate={navigate} />;
      case "patient-register":
        return <PatientRegisterPage navigate={navigate} />;
      default:
        return <DashboardPage navigate={navigate} />;
    }
  };

  return (
      <div className="pulmo-app">
        <Sidebar page={page} navigate={navigate} user={user} onLogout={() => { setUser(null); setPage("dashboard"); }} />
        <div className="content-area">
          <TopBar user={user} onLogout={() => { setUser(null); setPage("dashboard"); }} />
          <main className="main-scroll">{renderPage()}</main>
        </div>
      </div>
  );
}
