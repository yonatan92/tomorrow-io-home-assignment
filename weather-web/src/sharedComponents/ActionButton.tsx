import React from "react";
import styled from "styled-components";

type ActionButtonProps = {
  onClick: () => void;
  label: string;
  style?: React.CSSProperties;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  label,
  style,
}) => (
  <StyledButton onClick={onClick} style={style}>
    {label}
  </StyledButton>
);

export default ActionButton;

const StyledButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  &:hover:enabled {
    background: #1d4ed8;
  }
  &:active:enabled {
    background: #1e40af;
  }
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;
