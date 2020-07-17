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
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

/**
 * Helper that facilitate the use of the {@link Route} component
 */

/**
 * Returns a composite component where a {@link Route} component wraps the provided component
 *
 * @param {React.Component} WrappedComponent    - React component to be wrapped
 * @param {string} [extension=html]             - extension used to identify a route amongst the tree of resource URLs
 * @returns {CompositeRoute}
 */

const AsyncLoader = Loadable({
  loader: () => import('../import-components-async'),
  loading: () => <h3>Loading...</h3>,
  render: (_, { children }) => <>{children}</>,
});

export const withRoute = (WrappedComponent, extension) => {
  return function CompositeRoute(props) {
    const routePath = props.cqPath;

    if (!routePath) {
      return <WrappedComponent {...props} />;
    }

    extension = extension || 'html';

    // Context path + route path + extension
    return (
      <Route
        key={routePath}
        exact
        path={'(.*)' + routePath + '(.' + extension + ')?'}
        render={(routeProps) => {
          // Load the chunk asynchronously if the path contains 'page-2'
          return routePath.includes('page-2') ? (
            <AsyncLoader>
              <WrappedComponent {...props} {...routeProps} />
            </AsyncLoader>
          ) : (
            <WrappedComponent {...props} {...routeProps} />
          );
        }}
      />
    );
  };
};
