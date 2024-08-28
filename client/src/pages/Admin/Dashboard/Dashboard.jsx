import React from "react";
import {
  DashboardContainer,
  DashboardTitle,
  DashboardText,
  DashboardCard,
} from "./Dashboard.style";

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
