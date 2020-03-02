
function not(val) {
  switch (arguments.length) {
    case 0:
    case 1: {
      throw new Error('{{not}} not enough arguments');
    }
    case 2: {
      return !val;
    }
    default: {
      throw new Error('{{not}} too many arguments');
    }
  }
}

export default not;
