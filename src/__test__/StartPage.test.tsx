import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import StartPage from "@pages/index";
import { wrapper } from "./libs/renderUI";
import * as useRates from "@libs/swr/use-rates";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();

vi.mock("@hooks/useNav", () => {
  return {
    default: () => ({
      push: mockPush,
    }),
  };
});

function init() {
  const { unmount } = render(<StartPage />, {
    wrapper: (props) => wrapper(props, "/"),
  });
  return { unmount };
}

describe("StartPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render rates information", async () => {
    vi.spyOn(useRates, "default").mockReturnValue({
      rates: [
        {
          result: 1,
          cur_unit: "USD",
          cur_nm: "미국 달러",
          ttb: "1,177.10",
          tts: "1,198.90",
          deal_bas_r: "1,188.00",
          bkpr: "1,188.00",
          yy_efee_r: "0.00",
          ten_dd_efee_r: "0.00",
          kftc_deal_bas_r: "1,188.00",
          kftc_bkpr: "1,188.00",
        },
      ],
      isLoading: false,
    });
    const { unmount } = init();

    const rateHeading = screen.getByTestId("rate_unit");
    expect(rateHeading.innerHTML).toStrictEqual("USD");

    const rateName = screen.getByTestId("rate_unitname");
    expect(rateName.innerHTML).toStrictEqual("미국 달러");

    const rateDeal = screen.getByTestId("rate_deal");
    expect(rateDeal.innerHTML).toStrictEqual("1,188.00");

    unmount();
  });

  test("should render loading indicator when loading", async () => {
    vi.spyOn(useRates, "default").mockReturnValue({
      rates: [],
      isLoading: true,
    });
    const { unmount } = init();

    const loader = screen.getByTestId("loading_indicator");
    expect(loader).toBeDefined();

    const heading = screen.queryAllByTestId("rate_unit");
    expect(heading).toHaveLength(0);

    unmount();
  });

  test("should navigate to /unit/:code when clicking on rate", async () => {
    vi.spyOn(useRates, "default").mockReturnValue({
      rates: [
        {
          result: 1,
          cur_unit: "USD",
          cur_nm: "미국 달러",
          ttb: "1,177.10",
          tts: "1,198.90",
          deal_bas_r: "1,188.00",
          bkpr: "1,188.00",
          yy_efee_r: "0.00",
          ten_dd_efee_r: "0.00",
          kftc_deal_bas_r: "1,188.00",
          kftc_bkpr: "1,188.00",
        },
      ],
      isLoading: false,
    });

    const { unmount } = init();

    const container = screen.getAllByTestId("rate_container")[0];
    await userEvent.click(container);
    await waitFor(async () => {
      expect(mockPush.mock.calls[0][0]).toStrictEqual("/unit/USD");
    });

    unmount();
  });
});
