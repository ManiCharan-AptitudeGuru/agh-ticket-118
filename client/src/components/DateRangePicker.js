import React, { useEffect } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const DatePickerContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #3f51b5;
  margin-bottom: 0.25rem;
`;

const DateInput = styled.input`
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

function DateRangePicker({ control, name }) {
  if (!control || !name) {
    throw new Error("DateRangePicker requires 'control' and 'name' props.");
  }

  const today = new Date().toISOString().split("T")[0];

  const {
    field: startDateField,
    fieldState: { error: startDateError },
  } = useController({
    name: `${name}.start`,
    control,
    rules: {
      validate: (value) =>
        !value ||
        (new Date(value) <= new Date(control._formValues[name]?.end) &&
          new Date(value) <= new Date(today)) ||
        "Start date cannot be after the end date or in the future",
    },
  });

  const {
    field: endDateField,
    fieldState: { error: endDateError },
  } = useController({
    name: `${name}.end`,
    control,
    rules: {
      validate: (value) =>
        !value ||
        (new Date(value) >= new Date(control._formValues[name]?.start) &&
          new Date(value) <= new Date(today)) ||
        "End date cannot be before the start date or in the future",
    },
  });

  useEffect(() => {
    if (startDateField.ref.current && endDateField.ref.current) {
      if (startDateField.value) {
        endDateField.ref.current.min = startDateField.value;
      }
      if (endDateField.value) {
        startDateField.ref.current.max = endDateField.value;
      }
    }
  }, [startDateField.value, endDateField.value]);

  return (
    <DatePickerContainer>
      <DateInputGroup>
        <Label htmlFor={`${name}.start`}>Start Date:</Label>
        <DateInput
          id={`${name}.start`}
          type="date"
          {...startDateField}
          max={today}
        />
        {startDateError && (
          <span style={{ color: "red" }}>{startDateError.message}</span>
        )}
      </DateInputGroup>
      <DateInputGroup>
        <Label htmlFor={`${name}.end`}>End Date:</Label>
        <DateInput
          id={`${name}.end`}
          type="date"
          {...endDateField}
          min={startDateField.value || "1900-01-01"}
          max={today}
        />
        {endDateError && (
          <span style={{ color: "red" }}>{endDateError.message}</span>
        )}
      </DateInputGroup>
    </DatePickerContainer>
  );
}

export default DateRangePicker;
