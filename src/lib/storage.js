// Drop-in replacement for the window.storage API that Claude.ai artifacts
// provide automatically. Outside of Claude.ai that API doesn't exist, so we
// back it with localStorage here using the exact same method shapes
// (get/set/delete/list), including the "throws on missing key" behavior.

const NAMESPACE = "itsm-process-studio";

function fullKey(key, shared) {
  return `${NAMESPACE}:${shared ? "shared" : "personal"}:${key}`;
}

const storage = {
  async get(key, shared = false) {
    const raw = localStorage.getItem(fullKey(key, shared));
    if (raw === null) {
      throw new Error(`Key not found: ${key}`);
    }
    return { key, value: raw, shared };
  },

  async set(key, value, shared = false) {
    localStorage.setItem(fullKey(key, shared), value);
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    const existed = localStorage.getItem(fullKey(key, shared)) !== null;
    localStorage.removeItem(fullKey(key, shared));
    return { key, deleted: existed, shared };
  },

  async list(prefix = "", shared = false) {
    const fullPrefix = fullKey(prefix, shared);
    const nsPrefix = fullKey("", shared);
    const keys = Object.keys(localStorage)
      .filter((k) => k.startsWith(fullPrefix))
      .map((k) => k.slice(nsPrefix.length));
    return { keys, prefix, shared };
  },
};

// Install globally so the component code (which calls window.storage.*
// directly, unmodified from the Claude.ai artifact version) keeps working.
if (typeof window !== "undefined") {
  window.storage = storage;
}

export default storage;
