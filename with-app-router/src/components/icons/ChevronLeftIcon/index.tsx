export function ChevronLeftIcon({
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
        d='M15.75 19.5 8.25 12l7.5-7.5'
      />
    </svg>
  );
}

ChevronLeftIcon.defaultProps = {
  width: "w-6",
  height: "h-6",
};
