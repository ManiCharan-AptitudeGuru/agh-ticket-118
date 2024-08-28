import React, { useState, useEffect } from "react";
import ReportsTab from "../../../components/Admin/ReportsTab/ReportsTab";
import ProductPerformanceReport from "../../../components/Admin/ProductPerformanceReport/ProductPerformanceReport";
import AffiliatePerformanceReport from "../../../components/Admin/AffiliatePerformanceReport/AffiliatePerformanceReport";
import { ReportsContainer, ReportsTitle } from "./ReportsPage.style";

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
