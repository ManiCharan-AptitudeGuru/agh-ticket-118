import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReportsTab from "../components/ReportsTab";
import ProductPerformanceReport from "../components/ProductPerformanceReport";
import AffiliatePerformanceReport from "../components/AffiliatePerformanceReport";

const ReportsContainer = styled.div`
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

const ReportsTitle = styled.h1`
  color: #1a237e;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

function ReportsPage() {
  const [reportType, setReportType] = useState("product");

  useEffect(() => {
    setReportType("product");
  }, []);

  const handleReportSelection = (type) => {
    setReportType(type);
  };

  return (
    <ReportsContainer>
      <ReportsTitle>Reports</ReportsTitle>
      <ReportsTab onSelectReport={handleReportSelection} />
      {reportType === "product" && <ProductPerformanceReport />}
      {reportType === "affiliate" && <AffiliatePerformanceReport />}
    </ReportsContainer>
  );
}

export default ReportsPage;
