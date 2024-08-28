import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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
  ChartsWrapper,
} from "./AffiliatePerformanceReport.style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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
  const [productData, setProductData] = useState({});

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
          existing.productsMarketed = [
            ...new Set([...existing.productsMarketed, ...item.productsMarketed]),
          ];
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      setReportData(aggregatedData);
    } else {
      setReportData(filteredData);
    }

    // Aggregate product data
    const productCounts = filteredData.reduce((acc, item) => {
      item.productsMarketed.forEach((product) => {
        acc[product] = (acc[product] || 0) + 1;
      });
      return acc;
    }, {});

    setProductData(productCounts);
  }, [selectedOccupation, selectedAffiliate, dateRange.start, dateRange.end]);

  const linksChartData = {
    labels: reportData.map((item) => item.date),
    datasets: [
      {
        label: "Links Shared",
        data: reportData.map((item) => item.linksShared),
        backgroundColor: "rgba(63, 81, 181, 0.6)",
      },
    ],
  };

  const productChartData = {
    labels: Object.keys(productData),
    datasets: [
      {
        data: Object.values(productData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const linksChartOptions = {
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

  const productChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Most Marketed Products",
        font: {
          size: 16,
          weight: "bold",
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
      <ChartsWrapper>
        <ChartContainer>
          <Bar data={linksChartData} options={linksChartOptions} />
        </ChartContainer>
        <ChartContainer>
          <Doughnut data={productChartData} options={productChartOptions} />
        </ChartContainer>
      </ChartsWrapper>
    </ReportContainer>
  );
}

export default AffiliatePerformanceReport;