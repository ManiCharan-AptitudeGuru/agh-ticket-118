import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import DateRangePicker from "./DateRangePicker";
import { dummyProductData } from "../data/dummyData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ReportTitle = styled.h2`
  color: #1a237e;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #c5cae9;
  font-size: 1rem;
  background-color: #fff;
  color: #3f51b5;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
  height: 400px;
`;

function ProductPerformanceReport() {
  const { control, watch } = useForm({
    defaultValues: {
      product: "All",
      dateRange: { start: "", end: "" },
    },
  });

  const selectedProduct = watch("product");
  const dateRange = watch("dateRange");

  const [reportData, setReportData] = useState(dummyProductData);

  useEffect(() => {
    const filteredData = dummyProductData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      return (
        (selectedProduct === "All" || item.product === selectedProduct) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });

    if (selectedProduct === "All") {
      const aggregatedData = filteredData.reduce((acc, item) => {
        const existing = acc.find((data) => data.date === item.date);
        if (existing) {
          existing.clicks += item.clicks;
          existing.conversions += item.conversions;
          existing.revenue += item.revenue;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      setReportData(aggregatedData);
    } else {
      setReportData(filteredData);
    }
  }, [selectedProduct, dateRange]);

  const chartData = {
    labels: reportData.map((item) => item.date),
    datasets: [
      {
        label: "Clicks",
        data: reportData.map((item) => item.clicks),
        backgroundColor: "rgba(63, 81, 181, 0.6)",
      },
      {
        label: "Conversions",
        data: reportData.map((item) => item.conversions),
        backgroundColor: "rgba(103, 58, 183, 0.6)",
      },
      {
        label: "Revenue",
        data: reportData.map((item) => item.revenue),
        backgroundColor: "rgba(233, 30, 99, 0.6)",
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
          selectedProduct !== "All"
            ? `Performance Report for ${selectedProduct}`
            : "Performance Report for All Products",
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
          text: "Count/Revenue",
        },
      },
    },
  };

  return (
    <ReportContainer>
      <ReportTitle>Product Performance Report</ReportTitle>
      <FilterContainer>
        <Controller
          name="product"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="All">All Products</option>
              {Array.from(
                new Set(dummyProductData.map((item) => item.product))
              ).map((product) => (
                <option key={product} value={product}>
                  {product}
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

export default ProductPerformanceReport;
