import "@testing-library/jest-dom";

// Some Node builds ship a global `localStorage` that's present but
// non-functional without a `--localstorage-file` path (every method is
// undefined). ThemeContext's persistence can't be tested against that, so
// replace it with a real in-memory implementation when that's detected.
if (typeof window.localStorage?.setItem !== "function") {
  const store = new Map();
  const memoryLocalStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: memoryLocalStorage,
    writable: true,
    configurable: true,
  });
}

// jsdom doesn't implement matchMedia. ThemeContext relies on it for the
// system-preference default, so stub it here rather than let every test
// silently fall back to the "matchMedia unavailable" branch.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
