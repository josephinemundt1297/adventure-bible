import { beforeEach, describe, expect, it } from "vitest";
import { CAMPFIRE_STATE_KEY, leaveCampfire, readCampfire, startCampfire } from "../src/lib/campfire";

function createSessionStorage() {
  let store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => {
      store = new Map<string, string>();
    },
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  } satisfies Storage;
}

beforeEach(() => {
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: createSessionStorage(),
  });
});

describe("campfire", () => {
  it("starts and reads a recovery state", () => {
    const state = startCampfire();

    expect(state.startedAt).toEqual(expect.any(String));
    expect(readCampfire()).toEqual(state);
  });

  it("leaves the campfire", () => {
    startCampfire();
    leaveCampfire();

    expect(readCampfire()).toBeNull();
    expect(sessionStorage.getItem(CAMPFIRE_STATE_KEY)).toBeNull();
  });

  it("recovers from invalid stored state", () => {
    sessionStorage.setItem(CAMPFIRE_STATE_KEY, "not-json");

    expect(readCampfire()).toBeNull();
    expect(sessionStorage.getItem(CAMPFIRE_STATE_KEY)).toBeNull();
  });
});
