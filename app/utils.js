export const unique = arr => Array.from(new Set(arr));

export const sum = key => arr =>
  arr.reduce((s, { [key]: value }) => s + value, 0);
