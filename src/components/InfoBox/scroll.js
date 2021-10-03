const scroll = (() => {
  // eslint-disable-next-line no-unused-vars
  let count = 0;

  return (() => {
    setTimeout(count += 1, 500);
    console.log(count);
  });
})();

export default scroll();
