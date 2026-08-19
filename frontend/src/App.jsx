import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RequestForm from "./pages/RequestForm";

function App() {
  const [page, setPage] = useState("home");

  if (page === "form") {
    return <RequestForm onBack={() => setPage("home")} />;
  }

  return <LandingPage onStart={() => setPage("form")} />;
}

export default App;
