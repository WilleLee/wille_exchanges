import {
  commaNumberInput,
  formatNumberInput,
  inputToNumber,
} from "@libs/inputs";
import { describe, expect, test } from "vitest";

describe("methods", () => {
  test("inputToNumber", () => {
    expect(inputToNumber("")).toStrictEqual(0);
    expect(inputToNumber("0")).toStrictEqual(0);
    expect(inputToNumber("02")).toStrictEqual(2);
    expect(inputToNumber("2.33")).toStrictEqual(2.33);
    expect(inputToNumber("2.36")).toStrictEqual(2.36);
    expect(inputToNumber("03")).toStrictEqual(3);
    expect(inputToNumber("003")).toStrictEqual(3);
  });
  test("commaNumberInput", () => {
    expect(commaNumberInput("")).toStrictEqual("");
    expect(commaNumberInput(".")).toStrictEqual("0.");
    expect(commaNumberInput("..")).toStrictEqual("0.");
    expect(commaNumberInput("333")).toStrictEqual("333");
    expect(commaNumberInput("3333")).toStrictEqual("3,333");
    expect(commaNumberInput("33333")).toStrictEqual("33,333");
    expect(commaNumberInput("3333344443")).toStrictEqual("3,333,344,443");
    expect(commaNumberInput("3333.44333")).toStrictEqual("3,333.44");
    expect(commaNumberInput("33,33,333")).toStrictEqual("3,333,333");
  });
  test("formatNumberInput", () => {
    expect(formatNumberInput("")).toStrictEqual("0");
    expect(formatNumberInput(".")).toStrictEqual("0.");
    expect(formatNumberInput(".33")).toStrictEqual("0.33");
    expect(formatNumberInput(".300")).toStrictEqual("0.30");
    expect(formatNumberInput("3333.3444")).toStrictEqual("3,333.34");
    expect(formatNumberInput("03333.222")).toStrictEqual("3,333.22");
    expect(formatNumberInput("0013333.222")).toStrictEqual("13,333.22");
  });
});
