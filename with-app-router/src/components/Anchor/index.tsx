import React, { DetailedHTMLProps } from "react";

function Anchor({
  children,
  ...rest
}: DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a
      className="text-rose-300 relative before:content-[''] before:absolute before:block before:w-full
        before:h-[2px] before:bottom-0 before:left-0 before:bg-rose-300
        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
        before:transition before:ease-in-out before:duration-300"
      {...rest}
    >
      {children}
    </a>
  );
}

export default Anchor;
