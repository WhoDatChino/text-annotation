export const ChevronIcon = ({ dirUp = false }) => {
  const pathStr = dirUp ? `M20 70 L50 35 L80 70` : `M20 35 L50 70 L80 35`;

  return (
    <svg viewBox="0 0 100 100">
      <path
        d={pathStr}
        stroke="whitesmoke"
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};
