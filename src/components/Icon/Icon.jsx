import React from 'react';
import deathImg from '../../assets/img/death.svg';
import confirmedImg from '../../assets/img/test-results.svg';
import recoveredImg from '../../assets/img/no-virus.svg';

const TypeToIconMap = {
  death: () => (
    <img
      src={deathImg}
      width='50'
      height='50'
      alt='no img'
    />
  ),
  confirmed: () => (
    <img
      src={confirmedImg}
      width='50'
      height='50'
      alt='no img'
    />
  ),
  recovered: () => (
    <img
      src={recoveredImg}
      width='50'
      height='50'
      alt='no img'
    />
  ),
};

const Icon = (prop) => {
  const { status, idNumber } = prop;
  const icon = TypeToIconMap[status];
  const setIcon = icon(idNumber);

  return (
    <>
      {setIcon}
    </>
  );
};

export default Icon;
