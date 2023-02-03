import { describe, it, assert } from "vitest";

import a from "../src";

describe("skipped suite", () => {
  it("test", () => {
    assert.equal(a(4), 4);
  });
});
