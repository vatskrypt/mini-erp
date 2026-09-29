import assert from "node:assert/strict";
import { describe, it } from "node:test";

const values = new Map();
globalThis.localStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: (key) => values.delete(key),
};

const { saveToken, getToken, getRole, getUser, decodeToken, isTokenExpired, logout } =
  await import("./auth.ts");

function makeToken(payload) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode(payload)}.signature`;
}

describe("client authentication state", () => {
  it("stores token, role, and user from the API token payload", () => {
    const token = makeToken({
      userId: "user-1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "ADMIN",
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    saveToken(token);

    assert.equal(getToken(), token);
    assert.equal(decodeToken(token).userId, "user-1");
    assert.equal(getRole(), "ADMIN");
    assert.equal(getUser(), "Ada Lovelace");
    assert.equal(isTokenExpired(token), false);
  });

  it("treats expired or malformed tokens as expired and clears login state", () => {
    assert.equal(isTokenExpired("invalid"), true);
    assert.equal(isTokenExpired(makeToken({ exp: 1 })), true);

    logout();

    assert.equal(getToken(), null);
    assert.equal(getRole(), null);
    assert.equal(getUser(), null);
  });
});
