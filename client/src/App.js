import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ReportsPage from "./pages/Admin/ReportsPage/ReportsPage";
import NavBar from "./components/global/Navbar/Navbar";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: 2rem;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <NavBar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
