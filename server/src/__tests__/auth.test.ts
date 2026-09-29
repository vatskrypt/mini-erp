import assert from "node:assert/strict";
import { describe, it } from "node:test";

process.env.JWT_SECRET = "unit-test-secret-that-is-at-least-32-characters";
const { generateToken, verifyToken } = await import("../utils/jwt.js");
const { hashPassword, comparePassword } = await import("../utils/password.js");

describe("authentication utilities", () => {
  it("signs and verifies the server's userId-based token payload", () => {
    const payload = {
      userId: "user-123",
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "ADMIN" as const,
    };

    const verified = verifyToken(generateToken(payload));
    assert.equal(verified.userId, payload.userId);
    assert.equal(verified.name, payload.name);
    assert.equal(verified.email, payload.email);
    assert.equal(verified.role, payload.role);
  });

  it("rejects malformed and tampered tokens", () => {
    assert.throws(() => verifyToken("not-a-jwt"));
    const token = generateToken({
      userId: "user-123",
      name: "Ada",
      email: "ada@example.com",
      role: "ADMIN",
    });
    const [header, body] = token.split(".");
    assert.throws(() => verifyToken(`${header}.${body}.invalid`));
  });

  it("hashes passwords and compares only the matching password", async () => {
    const hash = await hashPassword("a-strong-password");

    assert.notEqual(hash, "a-strong-password");
    assert.equal(await comparePassword("a-strong-password", hash), true);
    assert.equal(await comparePassword("wrong-password", hash), false);
  });
});
