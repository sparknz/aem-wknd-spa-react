import React, { useState } from 'react';
import { Constants, ModelManager } from '@adobe/cq-spa-page-model-manager';
import { MapTo, Container } from '@adobe/cq-react-editable-components';

const ExperienceFragmentEditConfig = {
  emptyLabel: 'Experience Fragment',

  isEmpty: function (props) {
    return (
      !props ||
      !props.localizedFragmentVariationPath ||
      props.localizedFragmentVariationPath.trim().length < 1
    );
  },
};

function ExperienceFragment({ localizedFragmentVariationPath }) {
  const [{ fetching, model, error }, setState] = useState({
    fetching: false,
    model: undefined,
    error: undefined,
  });

  if (!model && !error) {
    if (!fetching) {
      setState({ model, fetching: true });
      ModelManager.getData(localizedFragmentVariationPath).then(
        (model) => setState({ fetching: false, model }),
        (error) => setState({ fetching: false, error }),
      );
    }
    return null;
  }

  return model ? (
    <Container
      cqItems={model[Constants.ITEMS_PROP]}
      cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
    />
  ) : (
    <span>Error</span>
  );
}

export default MapTo('wknd-spa-react/components/experiencefragment')(
  ExperienceFragment,
  ExperienceFragmentEditConfig,
);
