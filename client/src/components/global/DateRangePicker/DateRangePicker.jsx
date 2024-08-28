import React, { useEffect } from "react";
import { useController } from "react-hook-form";
import {
  DatePickerContainer,
  DateInputGroup,
  Label,
  DateInput,
} from "./DateRangePicker.style";

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
          onChange={(e) => {
            startDateField.onChange(e);
            if (
              e.target.value &&
              (!endDateField.value ||
                new Date(e.target.value) > new Date(endDateField.value))
            ) {
              endDateField.onChange(e.target.value);
            }
          }}
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
          onChange={(e) => {
            endDateField.onChange(e);
            if (
              e.target.value &&
              (!startDateField.value ||
                new Date(e.target.value) < new Date(startDateField.value))
            ) {
              startDateField.onChange(e.target.value);
            }
          }}
        />
        {endDateError && (
          <span style={{ color: "red" }}>{endDateError.message}</span>
        )}
      </DateInputGroup>
    </DatePickerContainer>
  );
}

export default DateRangePicker;
