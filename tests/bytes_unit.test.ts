import { assertStrictEquals } from "./deps.ts";
import { BytesUnit } from "../mod.ts";

Deno.test("BytesUnit.*", () => {
  assertStrictEquals(BytesUnit.B, "byte");
  assertStrictEquals(BytesUnit.KB, "kilobyte");
  assertStrictEquals(BytesUnit.KIB, "kibibyte");
  assertStrictEquals(BytesUnit.MB, "megabyte");
  assertStrictEquals(BytesUnit.MIB, "mebibyte");
  assertStrictEquals(BytesUnit.GB, "gigabyte");
  assertStrictEquals(BytesUnit.GIB, "gibibyte");
  assertStrictEquals(BytesUnit.TB, "terabyte");
  assertStrictEquals(BytesUnit.TIB, "tebibyte");
  assertStrictEquals(BytesUnit.PB, "petabyte");
  assertStrictEquals(BytesUnit.PIB, "pebibyte");
});
