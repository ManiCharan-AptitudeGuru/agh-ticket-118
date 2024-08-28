import React from "react";
import { TabContainer, TabButton } from "./ReportsTab.style";

function ReportsTab({ onSelectReport, activeReport }) {
  return (
    <TabContainer>
      <TabButton
        onClick={() => onSelectReport("product")}
        active={activeReport === "product"}
      >
        Product Performance
      </TabButton>
      <TabButton
        onClick={() => onSelectReport("affiliate")}
        active={activeReport === "affiliate"}
      >
        Affiliate Performance
      </TabButton>
    </TabContainer>
  );
}

export default ReportsTab;
