module.exports = {
  isEmpty: (input) => {
    if (!input || input === null) {
      return true;
    }
    if (typeof input === 'string') {
      return !!!input.length;
    }
    if (typeof input === 'number') {
      return !Number.isInteger(Math.abs(input));
    }
    return !!!Object.keys(input).length;
  },
  isValidMobileNumber: (input) => {
    return /^[6789]\d{9}$/.test(input);
  },
  isValidEmailId: (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}