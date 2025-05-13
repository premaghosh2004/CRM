import JudgeDashboard from "./components/JudgeDashboard"
import PoliceDashboard from "./components/PoliceDashboard"
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JailorDashboard from "./components/JailorDashboard";

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/judge-dashboard" element={<JudgeDashboard />} />
            <Route path="/police-dashboard" element={<PoliceDashboard />} />
            <Route path="/jailor-dashboard" element={<JailorDashboard />} />
        </Routes>
    </Router>
  )
}