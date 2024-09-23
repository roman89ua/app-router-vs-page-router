"use client";

import { ReactNode } from "react";
import { LinkProps } from "next/dist/client/link";
import Link from "next/link";
import { activeLinkStyles, linkStyles } from "@/components/styles/link-styles";
import { usePathname } from "next/navigation";

function AnchorLink({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & LinkProps) {
  const currentPath = usePathname();

  if (currentPath === rest.href.toString()) {
    return (
      <span className={`${activeLinkStyles} font-orbitron ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <Link className={`${linkStyles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

AnchorLink.defaultProps = {
  className: "",
};

export default AnchorLink;
