const ipConverter = (api) => {
  const countryTemp = api[1].split(':');
  const cityTemp = api[2].split(':');

  const country = countryTemp[1].split(' ');
  const city = cityTemp[1].split(' ');

  return [country[1], city[1]];
};

export default ipConverter;
