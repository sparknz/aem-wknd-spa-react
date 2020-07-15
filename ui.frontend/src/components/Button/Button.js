import React from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';

function Button({ text }) {
  return <button>{text}</button>;
}

export default MapTo('wknd-spa-react/components/button')(Button);
