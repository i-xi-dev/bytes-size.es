import { Integer } from "../deps.ts";
import { BytesUnit } from "./bytes_unit.ts";

type int = number;

const _BYTES: Record<BytesUnit, int> = {
  [BytesUnit.B]: 1,
  [BytesUnit.KB]: 1_000, // 10 ** 3
  [BytesUnit.MB]: 1_000_000, // 10 ** 6
  [BytesUnit.GB]: 1_000_000_000, // 10 ** 9
  [BytesUnit.TB]: 1_000_000_000_000, // 10 ** 12
  [BytesUnit.PB]: 1_000_000_000_000_000, // 10 ** 15
  [BytesUnit.KIB]: 1_024, // 2 ** 10
  [BytesUnit.MIB]: 1_048_576, // 2 ** 20
  [BytesUnit.GIB]: 1_073_741_824, // 2 ** 30
  [BytesUnit.TIB]: 1_099_511_627_776, // 2 ** 40
  [BytesUnit.PIB]: 1_125_899_906_842_624, // 2 ** 50
} as const;

/**
 * @example
 * ```javascript
 * const size = new BytesSize(2_048);
 * const unit = BytesUnit.KIB;
 * const kib = size.to(unit);
 * // kib
 * //   → 2
 * const format = new Intl.NumberFormat();
 * new Intl.NumberFormat("en", { style: "unit", unit: "kilobyte" });
 * ```
 */
class BytesSize {
  #byteCount: int;

  constructor(byteCount: int | bigint) {
    if (typeof byteCount === "bigint") {
      if ((byteCount >= 0) && (byteCount <= Number.MAX_SAFE_INTEGER)) {
        this.#byteCount = Number(byteCount);
      } else {
        throw new RangeError("byteCount");
      }
    } else if (typeof byteCount === "number") {
      if (Integer.isNonNegativeInteger(byteCount) === true) {
        this.#byteCount = byteCount;
      } else {
        throw new RangeError("byteCount");
      }
    } else {
      throw new TypeError("byteCount");
    }

    Object.freeze(this);
  }

  // static of(value: number, unit: string = BytesUnit.B): BytesSize {
  //   return new BytesSize(Math.ceil(value * _BYTES[unit]));
  // }

  /**
   * @param unit The following units are supported. Units are case sensitive.
   * - `"byte"`
   * - `"kilobyte"`
   * - `"kibibyte"`
   * - `"megabyte"`
   * - `"mebibyte"`
   * - `"gigabyte"`
   * - `"gibibyte"`
   * - `"terabyte"`
   * - `"tebibyte"`
   * - `"petabyte"`
   * - `"pebibyte"`
   * @returns The byte count expressed in specified unit.
   */
  to(unit: BytesUnit): number {
    if (typeof unit === "string") {
      if (Object.values(BytesUnit).includes(unit) !== true) {
        throw new RangeError("unit");
      }
    } else {
      throw new TypeError("unit");
    }

    const lowerUnit = unit.toLowerCase();
    const found = Object.values(BytesUnit).find((u) =>
      u.toLowerCase() === lowerUnit
    );
    if (found) {
      return this.#byteCount / _BYTES[found];
    }
    return undefined as never;
  }

  valueOf(): number {
    return this.#byteCount;
  }
}
Object.freeze(BytesSize);

export { BytesSize };
