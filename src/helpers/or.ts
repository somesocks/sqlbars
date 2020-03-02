
function or() {
  switch (arguments.length) {
    case 0:
    case 1: {
      throw new Error('{{or}} not enough arguments');
    }
    default: {
      let res = false;
      for (let i = 0; i < arguments.length - 1; i++) {
        res = res || arguments[i];
      }
      return res;
    }
  }
}

export default or;
