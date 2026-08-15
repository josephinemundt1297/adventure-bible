const APP_STORAGE_PREFIX = "adventure-bible:";

/**
 * The MVP intentionally starts every browser session from the same demo state.
 * Static content such as HP questions and quests lives in src/data and is never
 * cleared. User-generated state is browser-only and is removed on app startup.
 */
export function resetDemoUserData(): void {
  if (typeof window === "undefined") return;

  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keysToRemove: string[] = [];

    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key?.startsWith(APP_STORAGE_PREFIX)) keysToRemove.push(key);
    }

    keysToRemove.forEach((key) => storage.removeItem(key));
  }
}
