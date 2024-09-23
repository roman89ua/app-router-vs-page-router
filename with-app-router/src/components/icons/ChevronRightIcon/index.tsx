export function ChevronRightIcon({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`${width} ${height}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m8.25 4.5 7.5 7.5-7.5 7.5'
      />
    </svg>
  );
}

ChevronRightIcon.defaultProps = {
  width: "w-6",
  height: "h-6",
};
