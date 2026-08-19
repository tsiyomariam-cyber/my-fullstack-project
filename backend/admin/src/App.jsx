import { useState } from "react";

import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <AdminLogin
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

  return (
    <Dashboard
      onLogout={() => setLoggedIn(false)}
    />
  );
}

export default App;