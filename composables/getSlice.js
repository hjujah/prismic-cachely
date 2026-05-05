import _get from 'lodash/get';

export const getSliceLink = (item) => {
  const { asLink } = usePrismic();
  let value = _get(item, 'primary.link')
  return asLink(value);
};

export const getSliceText = (item) => {
  const { asText } = usePrismic();
  let value = _get(item, 'primary.title')
  return asText(value);
};
