import React from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import wkndLogoDark from '../../media/wknd-logo-dk.png';

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: ${theme('brandPrimary')};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.24);
`;

const HeaderContainer = styled.div`
  display: flex;
  max-width: $max-width;
  margin: 0 auto;
  padding-left: ${theme('gutterPadding')};
  padding-right: ${theme('gutterPadding')};
`;

const Logo = styled.div`
  z-index: 100;
  display: flex;
  padding-top: ${theme('gutterPadding')};
  padding-bottom: ${theme('gutterPadding')};
`;

const LogoImg = styled.img`
  width: 100px;
`;

export default () => {
  return (
    <Header>
      <HeaderContainer>
        <Logo>
          <LogoImg src={wkndLogoDark} alt="WKND SPA" />
        </Logo>
      </HeaderContainer>
    </Header>
  );
};
