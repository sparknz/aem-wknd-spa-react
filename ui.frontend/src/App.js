import React from 'react';
import { Page, withModel } from '@adobe/cq-react-editable-components';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { theme } from 'styled-tools';
import { theme as appTheme } from './styles/variables';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background-color: ${theme('bodyBg')};
    font-family: ${theme('fontFamilyBase')};
    margin: 0;
    padding: 0;
    font-size: ${theme('fontSizeBase')};
    text-align: left;
    color: ${theme('textColor')};
    line-height: ${theme('line-height-base')};
  }

  body.page {
    padding-top: 75px;
  }
`;

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <GlobalStyle />
        <div>
          <Header />
          {this.childComponents}
          {this.childPages}
        </div>
      </ThemeProvider>
    );
  }
}

export default withModel(App);
