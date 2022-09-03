const persistStore = {};

persistStore.get = key => {
  const persist = localStorage.getItem(key);
  if (persist) {
    return JSON.parse(persist);
  }
  return null;
};

persistStore.set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

persistStore.remove = key => {
  localStorage.removeItem(key);
};

export default persistStore;
