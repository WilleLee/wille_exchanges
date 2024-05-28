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
    const krwInput = screen.getByTestId("input_krw") as HTMLInputElement;
    expect(krwInput).toBeDefined();
    expect(krwInput.value).toStrictEqual("1");
    const usdInput = screen.getByTestId("input_usd") as HTMLInputElement;
    expect(usdInput).toBeDefined();
    expect(usdInput.value).toStrictEqual("1130.5");
    unmount();
  });
});
