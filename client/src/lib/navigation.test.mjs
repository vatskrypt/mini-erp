import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NAV_ITEMS } from "./navigation.ts";
import { ROLE_HOME } from "./roleHome.ts";

const serverRoles = new Set(["ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"]);

describe("role navigation", () => {
  it("uses only roles defined by the server", () => {
    for (const item of NAV_ITEMS) {
      for (const role of item.roles) {
        assert.ok(serverRoles.has(role), `${item.label} contains unknown role ${role}`);
      }
    }
  });

  it("gives each server role a valid home page", () => {
    for (const role of serverRoles) {
      assert.equal(ROLE_HOME[role], "/dashboard");
      assert.ok(NAV_ITEMS.some((item) => item.label === "Dashboard" && item.roles.includes(role)));
    }
  });

  it("restricts challan navigation to the role currently authorized by the API", () => {
    const challans = NAV_ITEMS.find((item) => item.label === "Challans");
    assert.deepEqual(challans?.roles, ["ADMIN"]);
  });
});

