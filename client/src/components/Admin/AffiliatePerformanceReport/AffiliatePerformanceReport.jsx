import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DateRangePicker from "../../global/DateRangePicker/DateRangePicker";
import { dummyAffiliateData } from "./data";

import {
  ReportContainer,
  ReportTitle,
  FilterContainer,
  Select,
  ChartContainer,
} from "./AffiliatePerformanceReport.style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AffiliatePerformanceReport() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      occupation: "All",
      affiliate: "All",
      dateRange: { start: "", end: "" },
    },
  });

  const selectedOccupation = watch("occupation");
  const selectedAffiliate = watch("affiliate");
  const dateRange = watch("dateRange");

  const [reportData, setReportData] = useState(dummyAffiliateData);
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    const filteredAffiliates =
      selectedOccupation === "All"
        ? Array.from(new Set(dummyAffiliateData.map((item) => item.affiliate)))
        : Array.from(
            new Set(
              dummyAffiliateData
                .filter((item) => item.occupation === selectedOccupation)
                .map((item) => item.affiliate)
            )
          );

    setAffiliates(filteredAffiliates);

    if (!filteredAffiliates.includes(selectedAffiliate)) {
      setValue("affiliate", "All");
    }
  }, [selectedOccupation, selectedAffiliate, setValue]);

  useEffect(() => {
    const filteredData = dummyAffiliateData.filter(
      (item) =>
        (selectedOccupation === "All" ||
          item.occupation === selectedOccupation) &&
        (selectedAffiliate === "All" || item.affiliate === selectedAffiliate) &&
        (!dateRange.start ||
          new Date(item.date) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(item.date) <= new Date(dateRange.end))
    );

    if (selectedAffiliate === "All") {
      const aggregatedData = filteredData.reduce((acc, item) => {
        const existing = acc.find((data) => data.date === item.date);
        if (existing) {
          existing.linksShared += item.linksShared;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      setReportData(aggregatedData);
    } else {
      setReportData(filteredData);
    }
  }, [selectedOccupation, selectedAffiliate, dateRange.start, dateRange.end]);

  const chartData = {
    labels: reportData.map((item) => item.date),
    datasets: [
      {
        label: "Links Shared",
        data: reportData.map((item) => item.linksShared),
        backgroundColor: "rgba(63, 81, 181, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          selectedAffiliate !== "All"
            ? `Performance Report for ${selectedAffiliate}`
            : selectedOccupation !== "All"
            ? `Performance Report for ${selectedOccupation}`
            : "Performance Report for All Affiliates",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Links Shared",
        },
      },
    },
  };

  return (
    <ReportContainer>
      <ReportTitle>Affiliate Performance Report</ReportTitle>
      <FilterContainer>
        <Controller
          name="occupation"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="All">All Occupations</option>
              {Array.from(
                new Set(dummyAffiliateData.map((item) => item.occupation))
              ).map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </Select>
          )}
        />
        <Controller
          name="affiliate"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="All">All Affiliates</option>
              {affiliates.map((affiliate) => (
                <option key={affiliate} value={affiliate}>
                  {affiliate}
                </option>
              ))}
            </Select>
          )}
        />
        <DateRangePicker control={control} name="dateRange" />
      </FilterContainer>
      <ChartContainer>
        <Bar data={chartData} options={options} />
      </ChartContainer>
    </ReportContainer>
  );
}

export default AffiliatePerformanceReport;
