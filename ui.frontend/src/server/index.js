import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Constants, ModelManager } from '@adobe/cq-spa-page-model-manager';
import { EditorContext } from '@adobe/cq-react-editable-components';
import { ServerStyleSheet } from 'styled-components';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import stats from '../../build/react-loadable.json';
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
  const modules = [];

  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={requestUrl} context={{}}>
        <EditorContext.Provider value={isInEditor}>
          <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            <App
              cqChildren={model[Constants.CHILDREN_PROP]}
              cqItems={model[Constants.ITEMS_PROP]}
              cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
              cqPath={pageModelRootPath}
              locationPathname={requestPath}
            />
          </Loadable.Capture>
        </EditorContext.Provider>
      </StaticRouter>,
    ),
  );

  const bundles = getBundles(stats, modules);
  const scripts = bundles.filter((bundle) => bundle.file.endsWith('.js'));

  const styles = sheet.getStyleTags();
  const state = JSON.stringify({
    rootModel: model,
    rootModelUrl: ModelManager.rootPath,
    pagePath,
  });

  return `
      ${styles}
     <div id="spa-root">${html}</div>
     <script type="application/json" id="__INITIAL_STATE__">
         ${state}
     </script>
     ${scripts
       .map((script) => {
         return `<script src="${script.publicPath}"></script>`;
       })
       .join('\n')}`;
}

const cqAppRootPath = '/content/wknd-spa-react/nz/en';

exapp.post(`${cqAppRootPath}/*.html`, (req, res, next) => {
  const wcmMode = req.headers['wcm-mode'];
  const isInEditor = (wcmMode && wcmMode === 'EDIT') || wcmMode === 'PREVIEW';

  const pagePath = req.path.replace('.html', '');
  const modelClient = new CustomModelClient('http://localhost:4502');

  // TODO: when the model is in the body extract it from there to avoid an additional roundtrip
  // when the server needs to make a call to AEM in order to retrieve the model.

  return ModelManager.initialize({
    path: cqAppRootPath,
    modelClient,
  })
    .then((rootModel) => {
      return ModelManager.getData({
        path: pagePath,
      }).then((pageModel) => {
        // Make sure the page model is included into the root model.
        const combinedModel = { ...rootModel };
        combinedModel[Constants.CHILDREN_PROP] = {
          ...rootModel[Constants.CHILDREN_PROP],
          [pagePath]: pageModel,
        };

        res.send(
          renderModelToHTMLString(
            combinedModel,
            pagePath,
            req.url,
            req.path,
            cqAppRootPath,
            isInEditor,
          ),
        );
      });
    })
    .catch((error) => {
      next(error);
    });
});

Loadable.preloadAll().then(() => {
  exapp.listen(4200, () =>
    console.log('Example exapp listening on port 4200!'),
  );
});
