export const formatString = (name = "", length = 10) => {
  if (name.length > length) {
    return `${name.slice(0, length - 3)}...`;
  } else {
    return name;
  }
};
