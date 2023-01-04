const GROUP_LIMIT = 4;
export default function (array) {
  return array.reduce(reducer, [[]]);
}

const reducer = (prev, current) => {
  if (prev[prev.length - 1].length >= GROUP_LIMIT) return [...prev, [current]];

  prev[prev.length - 1].push(current);
  return prev;
};
