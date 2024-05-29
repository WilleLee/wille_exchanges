import UnitPage from "@pages/UnitPage.tsx";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { GlobalPortal } from "@/GlobalPortal";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

const mockReplace = vi.fn();

vi.mock("@hooks/useNav", () => ({
  default: () => {
    return {
      replace: mockReplace,
    };
  },
}));

function initWithCode(code: string) {
  const { unmount } = render(
    <GlobalPortal.Provider>
      <Router initialEntries={[`/unit/${code}`]}>
        <Routes>
          <Route path="/unit/:code" element={<UnitPage />} />
        </Routes>
      </Router>
    </GlobalPortal.Provider>,
  );
  return { unmount };
}

describe("UnitPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should replace to / when code is wrong", async () => {
    const { unmount } = initWithCode("ABC");
    const button = screen.getByTestId("button_wrong_approach");
    expect(button.innerHTML).toStrictEqual("잘못된 접근입니다.");
    await userEvent.click(button);
    await waitFor(() => {
      expect(mockReplace.mock.calls[0][0]).toStrictEqual("/");
    });
    unmount();
  });
  test("should do the initial render", () => {
    const { unmount } = initWithCode("USD");
    const heading = screen.getByRole("heading", { name: "USD" });
    expect(heading).toBeDefined();
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    expect(krwInput).toBeDefined();
    expect(krwInput.value).toStrictEqual("1,130.5");
    const usdInput = screen.getByTestId("input_USD") as HTMLInputElement;
    expect(usdInput).toBeDefined();
    expect(usdInput.value).toStrictEqual("1");
    const ttb = screen.getByTestId("ttb");
    expect(ttb.innerHTML).toStrictEqual("1,139.00");
    const tts = screen.getByTestId("tts");
    expect(tts.innerHTML).toStrictEqual("1,122.00");
    unmount();
  });
  test("should change the krw input in correct format", async () => {
    const { unmount } = initWithCode("USD");
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    await userEvent.clear(krwInput);
    await userEvent.type(krwInput, "123456789");
    await waitFor(async () => {
      expect(krwInput.value).toStrictEqual("123,456,789");
    });
    await userEvent.clear(krwInput);
    await userEvent.type(krwInput, "123456789.333");
    await waitFor(async () => {
      expect(krwInput.value).toStrictEqual("123,456,789.33");
    });
    unmount();
  });
  test("should update usd input when krw input is changed", async () => {
    const { unmount } = initWithCode("USD");
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    const usdInput = screen.getByTestId("input_USD") as HTMLInputElement;
    await userEvent.clear(krwInput);
    await userEvent.type(krwInput, "2261");
    await waitFor(async () => {
      expect(usdInput.value).toStrictEqual("2");
    });
    unmount();
  });
  test("should change the usd input in correct format", async () => {
    const { unmount } = initWithCode("USD");
    const usdInput = screen.getByTestId("input_USD") as HTMLInputElement;
    await userEvent.clear(usdInput);
    await userEvent.type(usdInput, "123456789");
    await waitFor(async () => {
      expect(usdInput.value).toStrictEqual("123,456,789");
    });
    unmount();
  });
  test("should update krw input when usd input is changed", async () => {
    const { unmount } = initWithCode("USD");
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    const usdInput = screen.getByTestId("input_USD") as HTMLInputElement;
    await userEvent.clear(usdInput);
    await userEvent.type(usdInput, "2");
    await waitFor(async () => {
      expect(krwInput.value).toStrictEqual("2,261");
    });
    await userEvent.clear(usdInput);
    await userEvent.type(usdInput, "33");
    await waitFor(async () => {
      expect(krwInput.value).toStrictEqual("37,306.5");
    });
    unmount();
  });

  // 옌화
  test("should update jpy input when krw input is changed", async () => {
    const { unmount } = initWithCode("JPY(100)");
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    const jpyInput = screen.getByTestId("input_JPY(100)") as HTMLInputElement;
    await userEvent.clear(krwInput);
    await userEvent.type(krwInput, "10.2");
    await waitFor(async () => {
      expect(jpyInput.value).toStrictEqual("100");
    });
    unmount();
  });

  test("should update krw input when jpy input is changed", async () => {
    const { unmount } = initWithCode("JPY(100)");
    const krwInput = screen.getByTestId("input_KRW") as HTMLInputElement;
    const jpyInput = screen.getByTestId("input_JPY(100)") as HTMLInputElement;
    await userEvent.clear(jpyInput);
    await userEvent.type(jpyInput, "100");
    await waitFor(async () => {
      expect(krwInput.value).toStrictEqual("10.2");
    });
    unmount();
  });
});
