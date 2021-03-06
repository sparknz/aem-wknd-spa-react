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

// Use polyfills for modern language features
// The imports and dependencies can be removed if only modern browsers should be
// supported
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie9';
import 'custom-event-polyfill';

import { Constants, ModelManager } from '@adobe/cq-spa-page-model-manager';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './App';
import './components/import-components';

function render(pageModel, useHydrate) {
  ReactDOM[useHydrate ? 'hydrate' : 'render'](
    <BrowserRouter>
      <App
        cqChildren={pageModel[Constants.CHILDREN_PROP]}
        cqItems={pageModel[Constants.ITEMS_PROP]}
        cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
        cqPath={pageModel[Constants.PATH_PROP]}
        locationPathname={window.location.pathname}
      />
    </BrowserRouter>,
    document.getElementById('spa-root'),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const jsonScript = document.getElementById('__INITIAL_STATE__');
  let initialState = null;
  if (jsonScript) {
    initialState = JSON.parse(jsonScript.innerText);
    // Remove the script element from the DOM
    jsonScript.remove();
  }

  const styles = document.querySelector("[data-styled='true']");
  if (styles) {
    // Remove pre-rendered styles.
    styles.remove();
  }

  const initialModel = initialState ? initialState.rootModel : undefined;

  Promise.all([
    ModelManager.initialize({
      model: initialModel,
    }),
    Loadable.preloadReady(),
  ]).then(([model]) => {
    render(model, !!initialModel);
  });
});
