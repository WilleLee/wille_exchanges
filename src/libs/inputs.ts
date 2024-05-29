export function inputToNumber(value: string) {
  let result = 0;
  if (!value || value === "0") {
    return result;
  }
  const dotIndex = value.indexOf(".");
  if (dotIndex === -1) {
    return Number(value.replace(/\D/g, ""));
  }
  const left = value.slice(0, dotIndex).replace(/\D/g, "");
  const right = value.slice(dotIndex + 1).replace(/\D/g, "");
  result = Number(`${left}.${right}`);
  // result = Math.round(result * 100) / 100;
  return result;
}

export function formatNumberInput(value: string) {
  const commaed = commaNumberInput(value);
  if (!commaed) return "0";
  return commaed;
}

export function commaNumberInput(value: string) {
  const dotIndex = value.indexOf(".");

  if (dotIndex === -1) {
    return value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .replace(/^[0,]+/, "");
  }
  let left = value
    .slice(0, dotIndex)
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/^[0,]+/, "");
  if (!left) left = "0";
  const right = value
    .slice(dotIndex + 1)
    .replace(/\D/g, "")
    .slice(0, 2);
  return `${left}.${right}`;
}
