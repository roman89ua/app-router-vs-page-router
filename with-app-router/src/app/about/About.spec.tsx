import { render, screen } from "@testing-library/react";

import { dictionary } from "@/components/shared/helpers/dictionary";
import About from "./page";

describe("About page", () => {
  const aboutHeadingText = dictionary.about.heading;
  const aboutParagraphText = dictionary.about.paragraph;

  it(`Should contain "Share link button"`, () => {
    render(<About />);
    const shareLinkButton = screen.getByRole("button");
    expect(shareLinkButton).toHaveTextContent(
      dictionary.shareLinkBtn.shareLink
    );
  });

  it(`Should contain heading with text 
    "${aboutHeadingText}" and paragraph with text 
    "${aboutParagraphText}" elements on the page`, () => {
    render(<About />);
    const heading = screen.getByRole("heading");
    const paragraph = screen.getByRole("paragraph");

    expect(heading).toHaveTextContent(aboutHeadingText);
    expect(paragraph).toHaveTextContent(aboutParagraphText);
  });
});
