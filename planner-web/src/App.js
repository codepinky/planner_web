import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage"; // Importe a página de registro
import PlannerPage from "./Pages/PlannerPage/PlannerPage";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Rota para Login */}
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Rota para Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Planner Diário */}
        <Route path="/dailyplanner" element={<PlannerPage />} />

        {/* Home */}
        <Route path="/home" element={<HomePage />} />

        {/* Redirecionar rotas desconhecidas para Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
