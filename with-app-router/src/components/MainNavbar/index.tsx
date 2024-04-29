import AnchorLink from "@/components/AnchorLink";
import BiggestHeading from "../BigestHeading";

export const MainNavbar = () => (
  <nav className="flex justify-between">
    <AnchorLink href="/">
      <BiggestHeading>RomanGamer</BiggestHeading>
    </AnchorLink>
    <ul className="flex flex-row justify-end gap-5">
      <li>
        <AnchorLink href="/reviews" prefetch={true}>
          Reviews
        </AnchorLink>
      </li>
      <li>
        <AnchorLink href="/about" prefetch={true}>
          About
        </AnchorLink>
      </li>
    </ul>
  </nav>
);
