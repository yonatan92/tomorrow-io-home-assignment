import React from "react";
import styled from "styled-components";

type Props<T> = {
  data: T[];
  value: T | null;
  onChange: (option: T | null) => void;
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
};

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 1.05rem;
  border: 1.5px solid #2563eb;
  border-radius: 8px;
  background: #f8fafc;
  color: #23272f;
  margin-bottom: 6px;
  transition: border 0.2s;
  &:focus {
    border-color: #1d4ed8;
    outline: none;
    background: #fff;
  }
`;

const StyledOption = styled.option`
  color: #23272f;
  background: #fff;
`;

const DropDownWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DropDownError = styled.div`
  color: #e11d48;
  font-size: 0.95rem;
  margin-top: 4px;
`;

const DropDownLoading = styled.div`
  color: #2563eb;
  font-size: 0.95rem;
  margin-top: 4px;
`;

function DropDown<T extends { [key: string]: any }>({
  data,
  value,
  onChange,
  isLoading,
  error,
  placeholder = "Select an option",
  getOptionLabel = (option) => (option as any).label ?? (option as any).city,
  getOptionValue = (option) => (option as any).value ?? (option as any).city,
}: Props<T>) {
  return (
    <DropDownWrapper>
      {isLoading ? (
        <DropDownLoading>Loading...</DropDownLoading>
      ) : error ? (
        <DropDownError>Error: {error}</DropDownError>
      ) : (
        <StyledSelect
          value={value ? getOptionValue(value) : ""}
          onChange={(e) => {
            const selected =
              data.find(
                (option) => getOptionValue(option) === e.target.value
              ) || null;
            onChange(selected);
          }}
        >
          <StyledOption value="">{placeholder}</StyledOption>
          {data.slice(0, 1000).map((option, idx) => (
            <StyledOption
              key={getOptionValue(option) || idx}
              value={getOptionValue(option)}
            >
              {getOptionLabel(option)}
            </StyledOption>
          ))}
        </StyledSelect>
      )}
    </DropDownWrapper>
  );
}

export default DropDown;
