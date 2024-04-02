import { ReactNode } from "react";
import { LinkProps } from "next/dist/client/link";
import Link from "next/link";

function AnchorLink({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & LinkProps) {
  return (
    <Link
      className={`text-rose-300 relative before:content-[''] before:absolute before:block before:w-full before:h-[2px]
        before:bottom-0 before:left-0 before:bg-rose-300
        before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
        before:transition before:ease-in-out before:duration-300 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default AnchorLink;
