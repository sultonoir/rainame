export function stringToNumber(value: string | undefined): number {
  if (value === undefined) {
    return 0;
  }

  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    return 0;
  }

  return numberValue;
}
