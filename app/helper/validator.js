const isEmptyArray = (input) => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === undefined || input[i] === '') {
        return true;
      }
    };
    return false;
  } else {
    return true;
  }
}

module.exports = {
  isEmptyArray
}