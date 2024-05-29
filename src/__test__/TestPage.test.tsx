import TestPage from "@pages/TestPage.tsx";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { wrapper } from "./libs/renderUI";
import userEvent from "@testing-library/user-event";

function init() {
  const { unmount } = render(<TestPage />, {
    wrapper: (props) => wrapper(props, "/test"),
  });
  return { unmount };
}

describe("TestPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should do the initial render", async () => {
    const { unmount } = init();
    const heading = screen.getByTestId("heading");
    expect(heading.innerHTML).toStrictEqual("test");
    unmount();
  });
  test("should render the initial count", async () => {
    const { unmount } = init();
    const count = screen.getByTestId("count");
    expect(count.innerHTML).toStrictEqual("0");
    unmount();
  });
  test("should increment the count", async () => {
    const { unmount } = init();
    const count = screen.getByTestId("count");
    const incrementButton = screen.getByTestId("increment_button");
    expect(count.innerHTML).toStrictEqual("0");
    await userEvent.click(incrementButton);
    await waitFor(async () => {
      expect(count.innerHTML).toStrictEqual("1");
    });
    unmount();
  });
});
