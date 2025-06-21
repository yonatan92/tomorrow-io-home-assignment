import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Alerts from "./components/alerts/Alerts";
import SideMenu from "./sharedComponents/SideMenu";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Wrapper>
        <SideMenu />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </MainContent>
      </Wrapper>
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    background: #23272f; 
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  min-width: 0;
`;
