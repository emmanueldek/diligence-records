export const capitalizeWord = (word: string) => {
  return word
    .split("")
    .map((w, index) => (index == 0 ? w.toUpperCase() : w.toLowerCase()))
    .join("");
};

export const transformToLableValue = (
  data: Array<Record<string, string>>,
  prop: string,
) => {
  const res = data.map((datum) => {
    if (Object.keys(datum).includes(prop))
      return {
        label: datum[`${prop}`],
        value: datum[`${prop}`],
      };
    else {
      return { label: "", value: "" };
    }
  });

  return res;
};
