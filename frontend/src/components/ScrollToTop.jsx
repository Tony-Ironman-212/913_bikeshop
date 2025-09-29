import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // tắt auto scroll restore của browser
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // mỗi lần đổi path thì scroll về top
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
