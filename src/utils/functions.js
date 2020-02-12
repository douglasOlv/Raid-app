export const contains = ({ name }, query) => {
  if (name.includes(query)) {
    return true;
  }
  return false;
};
