import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DashboardTitle = styled.h1`
  color: #1a237e;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DashboardText = styled.p`
  color: #37474f;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const DashboardCard = styled.div`
  background-color: #e8eaf6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardTitle>Admin Dashboard</DashboardTitle>
      <DashboardText>
        Welcome to the admin dashboard. Here you can view reports.
      </DashboardText>
      <DashboardCard>
        <h2>Quick Links</h2>
        <ul>
          <li>View Reports</li>
        </ul>
      </DashboardCard>
    </DashboardContainer>
  );
}

export default Dashboard;
