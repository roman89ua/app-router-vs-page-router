import AnchorLink from "@/components/AnchorLink";
import BiggestHeading from "../BigestHeading";

export function MainNavbar() {
  return (
    <nav className='flex justify-between'>
      <AnchorLink href='/'>
        <BiggestHeading>RomanGamer</BiggestHeading>
      </AnchorLink>
      <ul className='flex flex-row justify-end gap-5'>
        <li>
          <AnchorLink href='/reviews' prefetch>
            Reviews
          </AnchorLink>
        </li>
        <li>
          <AnchorLink href='/about' prefetch>
            About
          </AnchorLink>
        </li>
      </ul>
    </nav>
  );
}
