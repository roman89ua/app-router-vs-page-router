import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { buttonWithLiftEffect } from "@/components/styles/button-styles";

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
    <div className="flex items-center gap-6 py-4">
      <PaginationLink
        disabled={currentPage === 1}
        href={`${path}?page=${currentPage === 1 ? currentPage : currentPage - 1}`}
      >
        <ChevronLeftIcon />
        <span className="sr-only">Previous page</span>
      </PaginationLink>

      <span>
        Page {currentPage} of {pageCount}
      </span>
      <PaginationLink
        disabled={currentPage === pageCount}
        href={`${path}?page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
      >
        <ChevronRightIcon />
        <span className="sr-only">Next page</span>
      </PaginationLink>
    </div>
  );
}

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
  return (
    <>
      {disabled ? (
        <span
          aria-disabled={disabled}
          className={`cursor-auto text-neutral-300 ${buttonWithLiftEffect} ${className}`}
        >
          {children}
        </span>
      ) : (
        <Link className={`${buttonWithLiftEffect} ${className}`} {...rest}>
          {children}
        </Link>
      )}
    </>
  );
}
