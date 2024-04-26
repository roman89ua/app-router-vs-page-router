"use client";

import { useRouter } from "next/navigation";
import AnchorLink from "@/components/AnchorLink";
import BiggestHeading from "../BigestHeading";

function MainNavbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between">
      <AnchorLink href="/">
        <BiggestHeading>RomanGamer</BiggestHeading>
      </AnchorLink>
      <ul className="flex flex-row justify-end gap-5">
        <li>
          <AnchorLink
            href="/reviews"
            prefetch={true}
            onMouseEnter={() => router.prefetch("/reviews")}
          >
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
}

export default MainNavbar;
