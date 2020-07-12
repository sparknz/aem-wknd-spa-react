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
import DOMPurify from 'dompurify';
import extractModelId from '../../utils/extract-model-id';

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {
  emptyLabel: 'Text',

  isEmpty: function (props) {
    return !props || !props.text || props.text.trim().length < 1;
  },
};

function getDOMPurify() {
  if (!process.env.SSR) {
    return DOMPurify;
  }
  // SSR
  const JSDOM = require('jsdom').JSDOM;
  return DOMPurify(new JSDOM('<!DOCTYPE html>').window);
}

const dompurify = getDOMPurify();

/**
 * Text React component
 */
function Text({ cqPath, text, richText }) {
  return richText ? (
    <div
      id={extractModelId(cqPath)}
      data-rte-editelement
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(text),
      }}
    />
  ) : (
    <p>{text}</p>
  );
}

export default MapTo('wknd-spa-react/components/text')(Text, TextEditConfig);
