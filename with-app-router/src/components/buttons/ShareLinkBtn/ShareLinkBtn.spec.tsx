import { render, screen, waitFor } from "@testing-library/react";

import { dictionary } from "@/components/shared/helpers/dictionary";
import { userEvent } from "@testing-library/user-event";
import ShareLinkBtn from "./index";

describe("ShareLinkBtn component", () => {
  const writeText = jest.fn();

  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  });

  beforeEach(() => {
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it(`Should contain "Share link button"`, () => {
    render(<ShareLinkBtn />);
    const shareLinkButton = screen.getByRole("button");
    expect(shareLinkButton).toBeInTheDocument();
    expect(shareLinkButton).toHaveTextContent(
      dictionary.shareLinkBtn.shareLink
    );
  });

  it(`Should change text value on
    "${dictionary.shareLinkBtn.copied}"
    for two seconds and then back to
    "${dictionary.shareLinkBtn.shareLink}" text`, async () => {
    render(<ShareLinkBtn />);

    const defaultButtonText = screen.getByTestId("share-button-value");
    expect(defaultButtonText).toBeInTheDocument();
    expect(defaultButtonText).toHaveTextContent(
      dictionary.shareLinkBtn.shareLink
    );

    const shareButton = screen.getByRole("button", {
      name: dictionary.shareLinkBtn.shareLink,
    });
    expect(shareButton).toBeInTheDocument();

    await userEvent.click(shareButton);

    const buttonTextSpanAfterShareClick =
      screen.getByTestId(/share-button-value/i);

    expect(buttonTextSpanAfterShareClick).toBeInTheDocument();
    expect(buttonTextSpanAfterShareClick).toHaveTextContent(
      dictionary.shareLinkBtn.copied
    );

    // console.log("TIMERS COUNT", jest.getTimerCount());
    jest.advanceTimersByTime(2000);
    // jest.runOnlyPendingTimers();
    // jest.runAllTimers();

    await waitFor(async () => {
      expect(
        await screen.findByTestId(/share-button-value/i)
      ).toHaveTextContent(dictionary.shareLinkBtn.shareLink);
    });
  });

  it(`Should copy something to clipboard by click`, async () => {
    render(<ShareLinkBtn />);

    const defaultButtonText = screen.getByTestId("share-button-value");
    expect(defaultButtonText).toBeInTheDocument();
    expect(defaultButtonText).toHaveTextContent(
      dictionary.shareLinkBtn.shareLink
    );

    const shareButton = screen.getByRole("button", {
      name: dictionary.shareLinkBtn.shareLink,
    });
    expect(shareButton).toBeInTheDocument();

    await userEvent.click(shareButton);

    expect(writeText).toHaveBeenCalled();
  });
});
