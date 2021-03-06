import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Body from "./components/body";
import AboutPage from "./components/pages/aboutPage";

const StyleWrapper = styled.div`
  background: ${({ theme }) => `${theme.colors.background}`};
  height: 100%;
  width: 100%;
`;

const FlexContainer = styled.div`
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
`;

const AppBody = () => {
  return (
    <StyleWrapper data-testid="app-body">
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <FlexContainer>
            <Header />
            <Body />
          </FlexContainer>
        </Route>
      </Switch>
    </StyleWrapper>
  );
};

export default AppBody;
