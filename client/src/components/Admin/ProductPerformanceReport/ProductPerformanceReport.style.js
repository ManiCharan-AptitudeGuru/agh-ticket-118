import styled from "styled-components";

export const ReportContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ReportTitle = styled.h2`
  color: #1a237e;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Select = styled.select`
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

export const ChartContainer = styled.div`
  margin-top: 2rem;
  height: 400px;
`;
