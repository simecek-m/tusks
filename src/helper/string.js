export const shortenString = (name = "", length = 10) => {
  if (name.length > length) {
    return `${name.slice(0, length)}...`;
  } else {
    return name;
  }
};
