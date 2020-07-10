import React, { useState, useEffect } from 'react';
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
    status: 'IDLE',
    model: undefined,
    error: undefined,
  });

  useEffect(() => {
    if (!path) {
      return;
    }

    setState({ status: 'LOADING' });
    ModelManager.getData(path).then(
      (model) => setState({ status: 'DONE', model }),
      (error) => setState({ status: 'ERROR', error }),
    );
  }, [path]);

  return {
    isLoading: (path && status === 'IDLE') || status === 'LOADING',
    model,
    error,
  };
}

function ExperienceFragment(props) {
  const { isLoading, model } = useFetchModel(
    props.localizedFragmentVariationPath,
  );
  const { isInEditor } = useCQContext();

  if (isLoading || ExperienceFragmentEditConfig.isEmpty(props)) {
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
