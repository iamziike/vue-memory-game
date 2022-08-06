class CustomLocalStorage {
  static set(key: string, value: any) {
    const data = { value };
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get<T>(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return (JSON.parse(data) as { value: T }).value;
  }
}

export default CustomLocalStorage;
