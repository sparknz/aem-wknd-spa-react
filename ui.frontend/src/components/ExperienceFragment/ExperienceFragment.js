import React, { useState } from 'react';
import { Constants, ModelManager } from '@adobe/cq-spa-page-model-manager';
import { MapTo, Container } from '@adobe/cq-react-editable-components';
import { useCQContext } from '../../lib/cqContext';

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

function useFetchModel(path) {
  const [{ status, model, error }, setState] = useState({
    status: 'INIT',
    model: undefined,
    error: undefined,
  });

  if (status === 'INIT') {
    setState({ status: 'LOADING' });
    ModelManager.getData(path).then(
      (model) => setState({ status: 'DONE', model }),
      (error) => setState({ status: 'ERROR', error }),
    );
  }
  return { isLoading: status === 'INIT' || status === 'LOADING', model, error };
}

function ExperienceFragment({ localizedFragmentVariationPath }) {
  const { isLoading, model } = useFetchModel(localizedFragmentVariationPath);
  const { isInEditor } = useCQContext();

  if (isLoading) {
    return null;
  }

  return model ? (
    <Container
      cqItems={model[Constants.ITEMS_PROP]}
      cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
      isInEditor={isInEditor}
    />
  ) : (
    <span>Error</span>
  );
}

export default MapTo('wknd-spa-react/components/experiencefragment')(
  ExperienceFragment,
  ExperienceFragmentEditConfig,
);
