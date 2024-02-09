import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  children?: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
