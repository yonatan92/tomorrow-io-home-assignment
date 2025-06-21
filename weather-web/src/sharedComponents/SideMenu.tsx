import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SideMenu: React.FC = () => {
  const location = useLocation();
  return (
    <MenuContainer className="side-menu">
      <MenuLink
        to="/"
        $active={location.pathname === "/"}
        className="side-menu-link"
      >
        Home
      </MenuLink>
      <MenuLink
        to="/alerts"
        $active={location.pathname === "/alerts"}
        className="side-menu-link"
      >
        Alerts
      </MenuLink>
    </MenuContainer>
  );
};

export default SideMenu;

const MenuContainer = styled.div`
  width: 220px;
  height: 100vh;
  background: #222;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const MenuLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? "#61dafb" : "#fff")};
  text-decoration: none;
  padding: 18px 32px;
  font-size: 1.1rem;
  background: ${({ $active }) => ($active ? "#333" : "none")};
  transition: background 0.2s;
  &:hover {
    background: #444;
    color: #1976d2;
  }
`;
