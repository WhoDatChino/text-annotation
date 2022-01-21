export const CrossIcon = ({ colour = "whitesmoke" }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d={`M30 30 L70 70 M30 70 L70 30`}
        stroke={colour}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};
