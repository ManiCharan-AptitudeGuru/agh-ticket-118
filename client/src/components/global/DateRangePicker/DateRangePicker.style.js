import styled from "styled-components";

export const DatePickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #3f51b5;
  margin-bottom: 0.25rem;
`;

export const DateInput = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #c5cae9;
  font-size: 1rem;
  color: #3f51b5;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;
