import React from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';

const ImageEditConfig = {
  emptyLabel: 'Image',

  isEmpty: function (props) {
    return !props || !props.src || props.src.trim().length < 1;
  },
};

const ImageSrc = styled.img`
  margin: 1rem 0;
  width: 100%;
  border: 0;
`;

const Image = (props) => {
  if (ImageEditConfig.isEmpty(props)) {
    return null;
  }

  const { src, alt, title } = props;
  return <ImageSrc src={src} alt={alt} title={title || alt} />;
};

export default MapTo('wknd-spa-react/components/image')(Image, ImageEditConfig);
