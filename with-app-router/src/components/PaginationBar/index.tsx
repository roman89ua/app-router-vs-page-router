import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { elementWithLiftEffect } from "@/components/styles/button-styles";

function PaginationLink({
  disabled = false,
  children,
  className,
  ...rest
}: LinkProps & {
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return disabled ? (
    <span
      aria-disabled={disabled}
      className={`cursor-auto text-neutral-300 ${elementWithLiftEffect} ${className}`}
    >
      {children}
    </span>
  ) : (
    <Link className={`${elementWithLiftEffect} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

PaginationLink.defaultProps = {
  disabled: false,
  className: "",
};

export function PaginationBar({
  path,
  currentPage,
  pageCount,
}: {
  path: string;
  currentPage: number;
  pageCount: number;
}) {
  return (
    <div className='flex items-center gap-6 py-4'>
      <PaginationLink
        disabled={currentPage === 1}
        href={`${path}?page=${currentPage === 1 ? currentPage : currentPage - 1}`}
      >
        <ChevronLeftIcon />
        <span className='sr-only'>Previous page</span>
      </PaginationLink>

      <span>
        Page {currentPage} of {pageCount}
      </span>
      <PaginationLink
        disabled={currentPage === pageCount}
        href={`${path}?page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
      >
        <ChevronRightIcon />
        <span className='sr-only'>Next page</span>
      </PaginationLink>
    </div>
  );
}
