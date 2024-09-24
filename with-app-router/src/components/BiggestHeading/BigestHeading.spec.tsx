import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BiggestHeading from "@/components/BiggestHeading/index";

describe("BiggestHeading", () => {
  const headingText: string = "Heading text";

  it(`should render h1 with text "${headingText}"`, () => {
    render(<BiggestHeading>{headingText}</BiggestHeading>);
    const headingWithPredefinedText = screen.getByText(headingText);
    expect(headingWithPredefinedText).toBeInTheDocument();
    expect(headingWithPredefinedText).toMatchSnapshot();
  });

  it(`should render h1 with text "${headingText}" and proper color of the test`, () => {
    render(
      <BiggestHeading
        style={{
          color: "red",
        }}
      >
        {headingText}
      </BiggestHeading>
    );
    const headingWithPredefinedText = screen.getByText(headingText);
    const headingStyle = window.getComputedStyle(headingWithPredefinedText);
    expect(headingStyle.color).toBe("blue");
  });
  // 'text-red-600' ===  color: rgb(220 38 38) or #DC2626  according to tailwindcss text color https://tailwindcss.com/docs/text-color
});
