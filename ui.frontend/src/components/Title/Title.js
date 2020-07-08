/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';
import { theme } from 'styled-tools';

const TitleEditConfig = {
  emptyLabel: 'Title',

  isEmpty: function (props) {
    return !props || !props.text || props.text.trim().length < 1;
  },
};

const TitleContainer = styled.div`
  h1 {
    font-size: 48px;
  }
  h2 {
    font-size: 36px;
  }
  h3 {
    font-size: 30px;
  }
`;

const TitleText = styled.div`
  color: ${theme('purple')};
`;

const TitleUnderline = styled.div`
  background: ${theme('purple')};
  margin-top: 24px;
  margin-bottom: 24px;
  height: 5px;
  width: 106px;
`;

function Title({ type = 'h1', text }) {
  return (
    <TitleContainer>
      <TitleText as={type}>{text}</TitleText>
      <TitleUnderline />
    </TitleContainer>
  );
}

export default MapTo('wknd-spa-react/components/title')(Title, TitleEditConfig);
