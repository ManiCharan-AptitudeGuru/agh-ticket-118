import styled from "styled-components";

export const ReportContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-top: 2.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 1.5rem;
  }

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

export const ReportTitle = styled.h2`
  color: #1a237e;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #c5cae9;
  font-size: 1rem;
  background-color: #fff;
  color: #3f51b5;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233f51b5' d='M10.293 3.293 6 7.586 1.707 3.293A1 1 0 0 0 .293 4.707l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.2);
  }

  &:hover {
    border-color: #3f51b5;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ChartContainer = styled.div`
  margin-top: 2.5rem;
  height: 450px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
