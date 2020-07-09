import React from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

import wkndLogoDark from '../../media/wknd-logo-dk.png';

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: ${theme('brandPrimary')};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.24);
`;

const HeaderContent = styled.div`
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

const HeaderEditConfig = {
  emptyLabel: 'Header',

  isEmpty: function (props) {
    return !props || !props.items || props.items.length < 1;
  },
};

function Header(props) {
  if (HeaderEditConfig.isEmpty(props)) {
    return null;
  }

  const { items } = props;
  return (
    <HeaderContainer className="Header">
      <HeaderContent>
        <Logo>
          <Link to={items[0].url}>
            <LogoImg src={wkndLogoDark} alt="WKND SPA" />
          </Link>
        </Logo>
        <Navigation {...props} />
      </HeaderContent>
    </HeaderContainer>
  );
}

export default MapTo('wknd-spa-react/components/header')(
  Header,
  HeaderEditConfig,
);
