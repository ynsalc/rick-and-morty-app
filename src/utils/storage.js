export const writeStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
