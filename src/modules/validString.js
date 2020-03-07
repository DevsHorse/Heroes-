  //Valid for classes options
  export const isValidString = str => {
    const isEmptyString = /\s+/ig.test(str);
    return typeof str === 'string' && str.length > 0 && !isEmptyString;
  };
  