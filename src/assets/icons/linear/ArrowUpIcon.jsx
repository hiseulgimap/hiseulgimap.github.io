function ArrowUpIcon({ color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ArrowUpIcon;
