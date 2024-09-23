import { DetailedHTMLProps, HTMLAttributes } from "react";

function BiggestHeading({
  children,
  className,
  ...restProps
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1 className={`font-extrabold text-2xl ${className} `} {...restProps}>
      {children}
    </h1>
  );
}

export default BiggestHeading;
