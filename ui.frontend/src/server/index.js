import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ModelManager } from '@adobe/cq-spa-page-model-manager';
import { Constants, EditorContext } from '@adobe/cq-react-editable-components';
import styled, { ServerStyleSheet } from 'styled-components';

import App from '../App';
import '../components/import-components';

import CustomModelClient from './CustomModelClient';

const exapp = express();
exapp.use(express.static('dist'));

function renderModelToHTMLString(
  model,
  pagePath,
  requestUrl,
  requestPath,
  pageModelRootPath,
  isInEditor,
) {
  const sheet = new ServerStyleSheet();

  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={requestUrl} context={{}}>
        <EditorContext.Provider value={isInEditor}>
          <App
            cqChildren={model[Constants.CHILDREN_PROP]}
            cqItems={model[Constants.ITEMS_PROP]}
            cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
            cqPath={pageModelRootPath}
            locationPathname={requestPath}
          />
        </EditorContext.Provider>
      </StaticRouter>,
    ),
  );

  // We are using ' for the string to we need to make sure we are encoding all other '
  const styles = sheet.getStyleTags();
  const state = JSON.stringify({
    rootModel: model,
    rootModelUrl: ModelManager.rootPath,
    pagePath,
  });

  return `
      ${styles}
      ${html}
     <script type="application/json" id="__INITIAL_STATE__">
         ${state}
     </script>`;
}

exapp.post('/content/wknd-spa-react/nz/en/*.html', (req, res, next) => {
  const wcmMode = req.headers['wcm-mode'];
  const isInEditor = (wcmMode && wcmMode === 'EDIT') || wcmMode === 'PREVIEW';
  const pagePath = req.path.replace('.html', '');
  const modelClient = new CustomModelClient('http://localhost:4502');

  // TODO: when the model is in the body extract it from there to avoid an additional roundtrip
  // when the server needs to make a call to AEM in order to retrieve the model.

  return ModelManager.initialize({
    path: '/content/wknd-spa-react/nz/en',
    modelClient,
  })
    .then(() => {
      return ModelManager.getData({
        path: pagePath,
      }).then((model) => {
        res.send(
          renderModelToHTMLString(
            model,
            pagePath,
            req.url,
            req.path,
            '/content/wknd-spa-react/nz/en',
            isInEditor,
          ),
        );
      });
    })
    .catch((error) => {
      next(error);
    });
});

exapp.listen(4200, () => console.log('Example exapp listening on port 4200!'));
