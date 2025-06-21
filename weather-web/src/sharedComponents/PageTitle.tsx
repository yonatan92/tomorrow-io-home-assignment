import React from "react";
import styled from "styled-components";

const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledTitle>{children}</StyledTitle>
);

export default PageTitle;

const StyledTitle = styled.h2`
  text-align: center;
  margin-bottom: 2vw;
  color: #fff;
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;
