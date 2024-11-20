import { memo } from "react";
import { Link } from "react-router-dom";

const MemoizedLink = memo(
  ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className: string;
  }) => {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  },
);

export { MemoizedLink };
