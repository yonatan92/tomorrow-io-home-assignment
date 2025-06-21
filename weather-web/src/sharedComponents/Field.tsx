import React from "react";
import styled from "styled-components";

type FieldProps = {
  label: string;
  value: string;
};

const Field: React.FC<FieldProps> = ({ label, value }) => (
  <Detail>
    <strong>{label}:</strong> {value}
  </Detail>
);

export default Field;

const Detail = styled.div`
  font-size: 1.1rem;
  margin-bottom: 4px;
`;
