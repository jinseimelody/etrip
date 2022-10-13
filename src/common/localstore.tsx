const localstore: any = {
  get: (key: string): any => {
    const serialized = localStorage.getItem(key)
    if (!serialized)
      return null
    return JSON.parse(serialized);
  },
  set: (key: string, data: any): any =>
    localStorage.setItem(key, JSON.stringify(data)),
  remove: (key: string): any => localStorage.removeItem(key)
};

export default localstore;
