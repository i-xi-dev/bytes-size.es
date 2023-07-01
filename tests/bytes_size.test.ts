import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BytesSize, BytesUnit } from "../mod.ts";

Deno.test("new BytesSize(number)", () => {
  const bc0 = new BytesSize(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bcm = new BytesSize(Number.MAX_SAFE_INTEGER);
  assertStrictEquals(bcm.valueOf(), Number.MAX_SAFE_INTEGER);

  assertThrows(
    () => {
      new BytesSize(1.1);
    },
    RangeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new BytesSize(-1);
    },
    RangeError,
    "byteCount",
  );
});

Deno.test("new BytesSize(bigint)", () => {
  const bc0 = new BytesSize(0n);
  assertStrictEquals(bc0.valueOf(), 0);

  assertThrows(
    () => {
      new BytesSize(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new BytesSize(-1n);
    },
    RangeError,
    "byteCount",
  );
});

Deno.test("new BytesSize(any)", () => {
  assertThrows(
    () => {
      new BytesSize(undefined as unknown as number);
    },
    TypeError,
    "byteCount",
  );
  assertThrows(
    () => {
      new BytesSize("1" as unknown as number);
    },
    TypeError,
    "byteCount",
  );
});

Deno.test("BytesSize.prototype.to(string)", () => {
  const bc0 = new BytesSize(0);
  assertStrictEquals(bc0.to(BytesUnit.B), 0);
  assertStrictEquals(bc0.to(BytesUnit.KIB), 0);
  assertStrictEquals(bc0.to(BytesUnit.KB), 0);

  const bc1 = new BytesSize(1000);
  assertStrictEquals(bc1.to(BytesUnit.B), 1000);
  assertStrictEquals(bc1.to(BytesUnit.KB), 1);

  const bc10 = new BytesSize(10000);
  assertStrictEquals(bc10.to(BytesUnit.B), 10000);
  assertStrictEquals(bc10.to(BytesUnit.KB), 10);
  const format = new Intl.NumberFormat("en", { style: "unit", unit: BytesUnit.KB });
  assertStrictEquals(format.format(bc10.to(BytesUnit.KB)), "10 kB");

  const bc1i = new BytesSize(1024);
  assertStrictEquals(bc1i.to(BytesUnit.B), 1024);
  assertStrictEquals(bc1i.to(BytesUnit.KIB), 1);

  const bce1 = new BytesSize(1);
  assertThrows(
    () => {
      bce1.to("" as unknown as BytesUnit);
    },
    RangeError,
    "unit",
  );
  assertThrows(
    () => {
      bce1.to("b" as unknown as BytesUnit);
    },
    RangeError,
    "unit",
  );
});

Deno.test("BytesSize.prototype.to(any)", () => {
  const bce1 = new BytesSize(1);
  assertThrows(
    () => {
      bce1.to(undefined as unknown as BytesUnit);
    },
    TypeError,
    "unit",
  );
});

Deno.test("BytesSize.prototype.valueOf()", () => {
  const bc0 = new BytesSize(0);
  assertStrictEquals(bc0.valueOf(), 0);

  const bc1 = new BytesSize(1000);
  assertStrictEquals(bc1.valueOf(), 1000);

  const bc1i = new BytesSize(1024);
  assertStrictEquals(bc1i.valueOf(), 1024);
});
